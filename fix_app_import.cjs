const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Insert it right after the first line
content = content.replace(
  'import React, { useState, useEffect, useRef } from "react";',
  'import React, { useState, useEffect, useRef } from "react";\nimport BangladeshHubView from "./components/BangladeshHubView";'
);

fs.writeFileSync(path, content);
