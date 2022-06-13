import * as React from 'react';
import { createRoot } from 'react-dom/client'

import { Hello } from "./components/Hello";

const root = createRoot(document.getElementById("root"));

root.render(
    <Hello compiler="TypeScript" framework="React" />,
);