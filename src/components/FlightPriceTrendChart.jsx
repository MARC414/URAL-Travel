import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { TrendingDown } from 'lucide-react';

export default function FlightPriceTrendChart({
  origin,
  destination,
  routeBaseFareBdt,
  currencyConfig,
  currency,
  tripType,
  cabinClass,
  passengers,
  departDate,
  isBn,
  onSelectDate,
}) {
  const priceTrend30Days = useMemo(() => {
    const destCode = (destination.code || 'KTM').toUpperCase();
    const origCode = (origin.code || 'DAC').toUpperCase();
    // Base round-trip BDT benchmark by route or region
    let baseBdt = typeof routeBaseFareBdt === 'number' ? routeBaseFareBdt : 34000;
    if (typeof routeBaseFareBdt !== 'number') {
      const globalBaselines = {
        JED: 68000,
        MED: 71000,
        RUH: 64000,
        DXB: 54000,
        AUH: 53000,
        DOH: 56000,
        SIN: 42000,
        MLE: 48000,
        CCU: 16500,
        DEL: 24500,
        LHR: 96000,
        LGW: 92000,
        MAN: 98000,
        CDG: 94000,
        FCO: 91000,
        IST: 78000,
        JFK: 128000,
        YYZ: 134000,
        SYD: 118000,
      };
      const codeSeed =
        (origCode.charCodeAt(0) + destCode.charCodeAt(0) + destCode.charCodeAt(1)) % 18;
      baseBdt = globalBaselines[destCode] || 52000 + codeSeed * 2400;
    }

    const tripMultiplier = tripType === 'oneway' ? 0.58 : 1.0;
    const cabinMultiplier = cabinClass === 'business' ? 2.35 : 1.0;
    const paxMultiplier = Math.max(1, passengers);
    const cfg = currencyConfig[currency] || currencyConfig.BDT;

    const points = [];
    const today = new Date();

    for (let offset = 1; offset <= 30; offset++) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      const iso = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay(); // 0 Sun .. 6 Sat
      const shortLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const weekdayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      // Historical aviation booking curve:
      // - Last-minute (days 1-5) carries a 14%-22% premium
      // - Sweet spot booking window (days 13-23) drops 6%-11%
      // - Tue/Wed departures are historically 5%-7% cheaper; Thu/Fri/Sun carry weekend demand surge
      let advanceFactor = 1.0;
      if (offset <= 4) advanceFactor = 1.19 - offset * 0.02;
      else if (offset <= 10) advanceFactor = 1.06 - (offset - 4) * 0.01;
      else if (offset >= 13 && offset <= 23) advanceFactor = 0.92 + ((offset % 3) * 0.012);
      else advanceFactor = 0.97 + ((offset % 4) * 0.015);

      const dowFactor =
        dayOfWeek === 2 || dayOfWeek === 3
          ? 0.94 // Tue / Wed lowest
          : dayOfWeek === 4 || dayOfWeek === 5
          ? 1.07 // Thu / Fri weekend surge
          : dayOfWeek === 0
          ? 1.04
          : 0.99;

      const wave = Math.sin((offset + destCode.charCodeAt(0)) * 0.65) * 0.025;
      const bdtFare = Math.round(
        (baseBdt * tripMultiplier * cabinMultiplier * paxMultiplier * (advanceFactor * dowFactor + wave)) /
          100
      ) * 100;

      const convertedFare = Math.round(bdtFare * cfg.rateFromBdt);

      points.push({
        dayOffset: offset,
        isoDate: iso,
        dateLabel: shortLabel,
        weekday: weekdayName,
        price: convertedFare,
        bdtPrice: bdtFare,
        formattedPrice: `${cfg.symbol}${convertedFare.toLocaleString()} ${cfg.code}`,
      });
    }

    const lowestPoint = points.reduce((min, p) => (p.price < min.price ? p : min), points[0]);
    const highestPoint = points.reduce((max, p) => (p.price > max.price ? p : max), points[0]);
    const avgPrice = Math.round(points.reduce((sum, p) => sum + p.price, 0) / points.length);
    const potentialSavings = Math.max(0, avgPrice - lowestPoint.price);

    return {
      points,
      lowestPoint,
      highestPoint,
      avgPrice,
      potentialSavings,
      currencySymbol: cfg.symbol,
      currencyCode: cfg.code,
    };
  }, [
    origin.code,
    destination.code,
    tripType,
    cabinClass,
    passengers,
    currency,
  ]);

  return (
            <div
                id="flight-price-trend-30d"
                className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-navy text-[#F6B73C] px-2.5 py-0.5 rounded-full">
                        <TrendingDown size={11} />
                        {isBn ? '৩০ দিনের আনুমানিক ভাড়া পূর্বাভাস' : '30-Day Indicative Fare Outlook'}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">
                        {origin.city} ({origin.code}) → {destination.city} (
                        {destination.code})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {isBn
                        ? 'এটি রুটভিত্তিক আনুমানিক হিসাব; প্রকৃত ভাড়া ভিন্ন হতে পারে। কোনো তারিখ বেছে নিলে আপনার যাত্রার তারিখ সেট হবে।'
                        : 'Illustrative route-based estimates, not live quotes. Select a date to set it as your departure.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectDate(priceTrend30Days.lowestPoint.isoDate);
                      }}
                      className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Apply the lowest estimated fare date"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>
                        {isBn ? 'সর্বনিম্ন আনুমানিক ভাড়া:' : 'Lowest estimate:'}{' '}
                        {priceTrend30Days.lowestPoint.dateLabel} (
                        {priceTrend30Days.lowestPoint.weekday}) ·{' '}
                        {priceTrend30Days.lowestPoint.formattedPrice}
                      </span>
                    </button>
                    <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold text-slate-600">
                      {isBn ? '৩০-দিনের গড়:' : '30d Avg:'}{' '}
                      <span className="font-bold text-slate-900">
                        {priceTrend30Days.currencySymbol}
                        {priceTrend30Days.avgPrice.toLocaleString()}{' '}
                        {priceTrend30Days.currencyCode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[190px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={priceTrend30Days.points}
                      margin={{ top: 8, right: 14, left: 4, bottom: 4 }}
                      onClick={(chartState) => {
                        const clickedIso = chartState?.activePayload?.[0]?.payload?.isoDate;
                        if (clickedIso) onSelectDate(clickedIso);
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis
                        dataKey="dateLabel"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickLine={false}
                        axisLine={{ stroke: '#cbd5e1' }}
                        interval={3}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickLine={false}
                        axisLine={false}
                        width={60}
                        domain={['dataMin - 500', 'dataMax + 500']}
                        tickFormatter={(val) =>
                          `${priceTrend30Days.currencySymbol}${
                            val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
                          }`
                        }
                      />
                      <Tooltip
                        cursor={{ stroke: '#F6B73C', strokeWidth: 2 }}
                        content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null;
                          const item = payload[0].payload;
                          const isLowest =
                            item.isoDate === priceTrend30Days.lowestPoint.isoDate;
                          return (
                            <div className="bg-brand-navy text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700 text-xs space-y-0.5">
                              <div className="font-mono text-[10px] text-[#F6B73C] uppercase font-bold">
                                {item.weekday}, {item.dateLabel}{' '}
                                {isLowest ? isBn ? '· ★ সর্বনিম্ন অনুমান' : '· ★ Lowest estimate' : ''}
                              </div>
                              <div className="font-black text-sm tabular-nums">
                                {item.formattedPrice}
                              </div>
                              <div className="text-[10px] text-slate-300">
                                {isBn
                                  ? 'তারিখটি সিলেক্ট করতে ক্লিক করুন'
                                  : 'Click point to select this departure date'}
                              </div>
                            </div>
                          );
                        }}
                      />
                      <ReferenceLine
                        y={priceTrend30Days.avgPrice}
                        stroke="#94a3b8"
                        strokeDasharray="4 4"
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#0B192C"
                        strokeWidth={2.5}
                        dot={(dotProps) => {
                          const { cx, cy, payload } = dotProps;
                          if (payload.isoDate === priceTrend30Days.lowestPoint.isoDate) {
                            return (
                              <circle
                                key={`dot-${payload.isoDate}`}
                                cx={cx}
                                cy={cy}
                                r={5.5}
                                fill="#10b981"
                                stroke="#ffffff"
                                strokeWidth={2}
                              />
                            );
                          }
                          if (payload.isoDate === departDate) {
                            return (
                              <circle
                                key={`dot-${payload.isoDate}`}
                                cx={cx}
                                cy={cy}
                                r={5}
                                fill="#F6B73C"
                                stroke="#0B192C"
                                strokeWidth={2}
                              />
                            );
                          }
                          return (
                            <circle
                              key={`dot-${payload.isoDate}`}
                              cx={cx}
                              cy={cy}
                              r={2.5}
                              fill="#0B192C"
                            />
                          );
                        }}
                        activeDot={{
                          r: 6,
                          fill: '#F6B73C',
                          stroke: '#0B192C',
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
  );
}
