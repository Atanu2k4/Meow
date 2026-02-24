module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/meow/components/cateyes.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CatEyes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function CatEyes({ baseMood }) {
    const [currentMood, setCurrentMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(baseMood);
    const [pupilOffset, setPupilOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("initial");
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle Mounting
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMounted(true);
    }, []);
    // Refs for managing timeouts to avoid collisions/leaks
    const blinkTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const behaviorTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle Animation Sequence
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isMounted) return;
        // 1. Show eyes for 2s (Phase: initial)
        const timer1 = setTimeout(()=>{
            setPhase("greeting");
        }, 2000);
        // 2. Show greeting for 3s (Phase: greeting)
        // Total wait: 2s + 3s = 5s
        const timer2 = setTimeout(()=>{
            setPhase("active");
        }, 5000);
        return ()=>{
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [
        isMounted
    ]);
    // Sync prop changes to state (base mood changes)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (phase !== "active") return;
        // Don't interrupt a manual wave with base mood changes
        setCurrentMood((prev)=>prev === "blink" || prev === "waving" ? prev : baseMood);
        if (currentMood !== "waving") setRotation(0); // Reset rotation on mood change, unless waving
    }, [
        baseMood,
        phase,
        currentMood
    ]);
    // Handle specific wave trigger from parent
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (baseMood === "waving") {
            setCurrentMood("waving");
            const timer = setTimeout(()=>{
                setCurrentMood(phase === "active" ? "normal" : baseMood); // Revert to normal or baseMood after waving
            }, 2000);
            return ()=>clearTimeout(timer);
        }
    }, [
        baseMood,
        phase
    ]);
    // 1. Independent Blink Loop (Human-like timing)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (phase !== "active" || currentMood === "waving") return; // Pause blink loop if waving
        const blinkLoop = ()=>{
            const nextBlink = Math.random() * 4000 + 2000;
            blinkTimeoutRef.current = setTimeout(()=>{
                const prevMoodBeforeBlink = currentMood;
                setCurrentMood("blink");
                setTimeout(()=>{
                    setCurrentMood(prevMoodBeforeBlink === "blink" ? baseMood : prevMoodBeforeBlink);
                    if (Math.random() < 0.1) {
                        setTimeout(()=>{
                            setCurrentMood("blink");
                            setTimeout(()=>setCurrentMood(prevMoodBeforeBlink), 150);
                        }, 100);
                    }
                    blinkLoop();
                }, 150);
            }, nextBlink);
        };
        blinkLoop();
        return ()=>{
            if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
        };
    }, [
        baseMood,
        phase,
        currentMood
    ]);
    // 2. Behavioral Overhaul (Flapping moods, complex scanning, and thinking)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (phase !== "active" || currentMood === "waving") return; // Pause behavior loop if waving
        const behaviorLoop = ()=>{
            const delay = Math.random() * 2000 + 1000; // Faster intervals for more life
            behaviorTimeoutRef.current = setTimeout(()=>{
                const action = Math.random();
                // A. Complex Eye Movements (50% chance)
                if (action < 0.45) {
                    const subAction = Math.random();
                    // 1. Double Scan (left then right)
                    if (subAction < 0.25) {
                        const firstDir = Math.random() > 0.5 ? 30 : -30;
                        setPupilOffset({
                            x: firstDir,
                            y: 0
                        });
                        setTimeout(()=>{
                            setPupilOffset({
                                x: -firstDir,
                                y: 0
                            });
                            setTimeout(()=>setPupilOffset({
                                    x: 0,
                                    y: 0
                                }), 500);
                        }, 700);
                    } else if (subAction < 0.45) {
                        setPupilOffset({
                            x: -35,
                            y: 5
                        });
                        setTimeout(()=>{
                            setPupilOffset({
                                x: 35,
                                y: -5
                            });
                            setTimeout(()=>setPupilOffset({
                                    x: 0,
                                    y: 0
                                }), 800);
                        }, 1000);
                    } else if (subAction < 0.65) {
                        const side = Math.random() > 0.5 ? 20 : -20;
                        setPupilOffset({
                            x: side,
                            y: -30
                        });
                        setTimeout(()=>setPupilOffset({
                                x: 0,
                                y: 0
                            }), 1200);
                    } else if (subAction < 0.8) {
                        setPupilOffset({
                            x: 0,
                            y: 20
                        });
                        setTimeout(()=>setPupilOffset({
                                x: 0,
                                y: 0
                            }), 400);
                    } else {
                        const rx = (Math.random() - 0.5) * 40;
                        const ry = (Math.random() - 0.5) * 20;
                        setPupilOffset({
                            x: rx,
                            y: ry
                        });
                        setTimeout(()=>{
                            setPupilOffset({
                                x: -rx / 2,
                                y: -ry / 2
                            });
                            setTimeout(()=>setPupilOffset({
                                    x: 0,
                                    y: 0
                                }), 200);
                        }, 200);
                    }
                } else if (action < 0.8) {
                    const variation = Math.random();
                    if (baseMood === "happy") {
                        if (variation < 0.4) {
                            setCurrentMood("normal");
                            setTimeout(()=>setCurrentMood("happy"), 2000);
                        } else if (variation < 0.7) {
                            setCurrentMood("squint");
                            setTimeout(()=>setCurrentMood("happy"), 1500);
                        } else {
                            setCurrentMood("surprised");
                            setTimeout(()=>setCurrentMood("happy"), 800);
                        }
                    } else if (baseMood === "normal") {
                        if (variation < 0.35) {
                            setCurrentMood("curious");
                            setRotation(variation < 0.17 ? 15 : -15);
                            setTimeout(()=>{
                                setCurrentMood("normal");
                                setRotation(0);
                            }, 1500);
                        } else if (variation < 0.5) {
                            setCurrentMood("annoyed");
                            setTimeout(()=>setCurrentMood("normal"), 2000);
                        } else if (variation < 0.6) {
                            setCurrentMood("sleeping");
                            setTimeout(()=>setCurrentMood("normal"), 3000);
                        }
                    } else if (baseMood === "angry") {
                        if (variation < 0.5) {
                            setCurrentMood("narrow");
                            setTimeout(()=>setCurrentMood("angry"), 1500);
                        }
                    }
                }
                behaviorLoop();
            }, delay);
        };
        behaviorLoop();
        return ()=>{
            if (behaviorTimeoutRef.current) clearTimeout(behaviorTimeoutRef.current);
        };
    }, [
        baseMood,
        phase,
        currentMood
    ]);
    if (!isMounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            transform: currentMood === "waving" ? undefined : `rotate(${rotation}deg) translateY(${phase === "active" ? "-5px" : "0px"})`,
            animation: currentMood === "waving" ? 'wave-body 0.5s ease-in-out infinite' : phase === "active" ? 'float-container 4s ease-in-out infinite' : 'none'
        },
        className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
            [
                "3522de11bc6c2614",
                [
                    rotation,
                    rotation,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y
                ]
            ]
        ]) + " " + `eyes-container relative transition-all duration-300 ${currentMood === "waving" ? "waving-face" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    opacity: phase === "greeting" ? 1 : 0
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3522de11bc6c2614",
                        [
                            rotation,
                            rotation,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y
                        ]
                    ]
                ]) + " " + `greeting ${phase === "greeting" ? "visible" : ""}`,
                children: "Hi I'm Meow !!"
            }, void 0, false, {
                fileName: "[project]/meow/components/cateyes.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3522de11bc6c2614",
                        [
                            rotation,
                            rotation,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y
                        ]
                    ]
                ]) + " " + `eye left ${currentMood === "waving" ? "happy" : currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`
            }, void 0, false, {
                fileName: "[project]/meow/components/cateyes.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3522de11bc6c2614",
                        [
                            rotation,
                            rotation,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y
                        ]
                    ]
                ]) + " " + `eye right ${currentMood === "waving" ? "happy" : currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`
            }, void 0, false, {
                fileName: "[project]/meow/components/cateyes.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3522de11bc6c2614",
                        [
                            rotation,
                            rotation,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y
                        ]
                    ]
                ]) + " " + `hands-container ${currentMood === "waving" ? "visible" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "3522de11bc6c2614",
                                [
                                    rotation,
                                    rotation,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y
                                ]
                            ]
                        ]) + " " + "cat-hand left-hand"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/cateyes.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "3522de11bc6c2614",
                                [
                                    rotation,
                                    rotation,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y,
                                    pupilOffset.x,
                                    pupilOffset.y
                                ]
                            ]
                        ]) + " " + "cat-hand right-hand"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/cateyes.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/meow/components/cateyes.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            phase === "active" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3522de11bc6c2614",
                        [
                            rotation,
                            rotation,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y,
                            pupilOffset.x,
                            pupilOffset.y
                        ]
                    ]
                ]) + " " + `exclamation ${baseMood === "angry" || currentMood === "angry" ? "visible" : ""}`,
                children: "!"
            }, void 0, false, {
                fileName: "[project]/meow/components/cateyes.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "3522de11bc6c2614",
                dynamic: [
                    rotation,
                    rotation,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y,
                    pupilOffset.x,
                    pupilOffset.y
                ],
                children: `@keyframes float-container{0%,to{transform:rotate(${rotation}deg)translateY(-5px)}50%{transform:rotate(${rotation}deg)translateY(5px)}}@keyframes wave-body{0%,to{transform:rotate(-5deg)translate(-5px)}50%{transform:rotate(5deg)translate(5px)}}@keyframes hand-wave-left{0%,to{transform:rotate(-20deg)translateY(0)}50%{transform:rotate(-40deg)translateY(-15px)}}@keyframes hand-wave-right{0%,to{transform:rotate(20deg)translateY(0)}50%{transform:rotate(40deg)translateY(-15px)}}.hands-container.__jsx-style-dynamic-selector{pointer-events:none;opacity:0;width:100%;height:100%;transition:opacity .3s;position:absolute}.hands-container.visible.__jsx-style-dynamic-selector{opacity:1}.cat-hand.__jsx-style-dynamic-selector{filter:blur(.3px);background:#fff;border-radius:22px 22px 14px 14px;width:44px;height:34px;position:absolute;bottom:-45px;box-shadow:0 4px 20px #ffffff26}.left-hand.__jsx-style-dynamic-selector{animation:.5s ease-in-out infinite hand-wave-left;left:-20px}.right-hand.__jsx-style-dynamic-selector{animation:.5s ease-in-out infinite hand-wave-right;right:-20px}.eyes-container.__jsx-style-dynamic-selector{justify-content:center;align-items:center;gap:30px;min-height:100px;margin-bottom:20px;display:flex;position:relative}.greeting.__jsx-style-dynamic-selector{font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif;color:#fff;opacity:0;letter-spacing:-.04em;white-space:nowrap;pointer-events:none;font-size:36px;font-weight:300;transition:all .9s cubic-bezier(.22,1,.36,1);position:absolute;transform:translateY(10px)}.greeting.visible.__jsx-style-dynamic-selector{opacity:1;transform:translateY(0)}.exclamation.__jsx-style-dynamic-selector{color:#fff;opacity:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-size:60px;font-weight:900;transition:all .3s cubic-bezier(.175,.885,.32,1.275);position:absolute;top:-60px;left:calc(50% + 60px);transform:translate(-50%)rotate(10deg)}.exclamation.visible.__jsx-style-dynamic-selector{opacity:1;top:-90px;transform:translate(-50%)rotate(15deg)scale(1.2)}@keyframes float{0%,to{transform:translate(${pupilOffset.x}px,${pupilOffset.y}px)}50%{transform:translate(${pupilOffset.x}px,${pupilOffset.y}px)translateY(-3px)}}.eye.__jsx-style-dynamic-selector{opacity:1;width:90px;height:90px;transform:translate(${pupilOffset.x}px,${pupilOffset.y}px);background:#fff;border-radius:20px;transition:all .4s cubic-bezier(.19,1,.22,1);position:relative;overflow:hidden;box-shadow:0 0 30px #ffffff1a}.hidden-eye.__jsx-style-dynamic-selector{opacity:0;pointer-events:none;transform:translateY(20px)scale(.5)}.eye.blink.__jsx-style-dynamic-selector{transform:translate(0)!important}.normal.__jsx-style-dynamic-selector{border-radius:18px;height:90px}.happy.__jsx-style-dynamic-selector{border-radius:50% 50% 12px 12px;height:50px;margin-top:20px;transform:scaleX(1.1)}.happy.__jsx-style-dynamic-selector:after{content:"";background:#000;border-radius:50% 50% 0 0;width:100%;height:40%;position:absolute;bottom:0;left:0}.squint.__jsx-style-dynamic-selector{border-radius:50% 50% 12px 12px;height:30px;margin-top:40px;transform:scaleX(1.15)}.squint.__jsx-style-dynamic-selector:after{content:"";background:#000;border-radius:50% 50% 0 0;width:100%;height:50%;position:absolute;bottom:0;left:0}.angry.__jsx-style-dynamic-selector{border-radius:12px;height:80px}.angry.left.__jsx-style-dynamic-selector{transform:rotate(-15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.angry.right.__jsx-style-dynamic-selector{transform:rotate(15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.angry.__jsx-style-dynamic-selector:before{content:"";background:#000;height:50px;position:absolute;top:-20px;left:-20px;right:-20px;transform:rotate(10deg)}.angry.right.__jsx-style-dynamic-selector:before{transform:rotate(-10deg)}.narrow.__jsx-style-dynamic-selector{border-radius:8px;height:50px}.narrow.left.__jsx-style-dynamic-selector{transform:rotate(-15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.narrow.right.__jsx-style-dynamic-selector{transform:rotate(15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.narrow.__jsx-style-dynamic-selector:before{content:"";background:#000;height:50px;position:absolute;top:-20px;left:-20px;right:-20px;transform:rotate(10deg)}.narrow.right.__jsx-style-dynamic-selector:before{transform:rotate(-10deg)}.sad.__jsx-style-dynamic-selector{border-radius:40% 40% 20% 20%;height:70px;margin-top:10px}.sad.__jsx-style-dynamic-selector:after{content:"";background:#0000001a;width:100%;height:30%;position:absolute;top:0;left:0}.annoyed.__jsx-style-dynamic-selector{border-radius:4px 4px 18px 18px;height:45px;margin-top:22px}.curious.__jsx-style-dynamic-selector{border-radius:35%;width:95px;height:95px}.sleeping.__jsx-style-dynamic-selector{opacity:.6;border-radius:2px;margin-top:60px;width:80px!important;height:4px!important}.surprised.__jsx-style-dynamic-selector{border-radius:50%;width:100px;height:100px;transform:scale(1.1)}.blink.__jsx-style-dynamic-selector{border-radius:2px;margin-top:43px;width:90px!important;height:4px!important}.blink.__jsx-style-dynamic-selector:before,.blink.__jsx-style-dynamic-selector:after{display:none}`
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/meow/components/cateyes.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
}),
"[project]/meow/components/Timer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Timer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Timer({ onStateChange }) {
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMounted(true);
    }, []);
    const start = ()=>{
        if (intervalRef.current) return;
        intervalRef.current = setInterval(()=>{
            setTime((prev)=>prev + 1);
        }, 1000);
        onStateChange?.("running");
    };
    const pause = ()=>{
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        onStateChange?.("paused");
    };
    const reset = ()=>{
        pause();
        setTime(0);
        onStateChange?.("idle");
    };
    const formatTime = (t)=>{
        const hrs = Math.floor(t / 3600);
        const mins = Math.floor(t % 3600 / 60);
        const secs = t % 60;
        return `${hrs} : ${String(mins).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
    };
    if (!isMounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            opacity: isMounted ? 1 : 0,
            transition: "opacity 1s ease 5s" // Delay until eyes are active
        },
        className: "jsx-5c6f10b709a2dea5" + " " + "timer-container uppercase",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "jsx-5c6f10b709a2dea5" + " " + "timer-display",
                children: formatTime(time)
            }, void 0, false, {
                fileName: "[project]/meow/components/Timer.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-5c6f10b709a2dea5" + " " + "controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: start,
                        className: "jsx-5c6f10b709a2dea5",
                        children: "START"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Timer.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: pause,
                        className: "jsx-5c6f10b709a2dea5",
                        children: "PAUSE"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Timer.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "jsx-5c6f10b709a2dea5",
                        children: "RESET"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Timer.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/meow/components/Timer.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "5c6f10b709a2dea5",
                children: ".timer-container.jsx-5c6f10b709a2dea5{flex-direction:column;align-items:center;gap:30px;margin-top:20px;display:flex}.timer-display.jsx-5c6f10b709a2dea5{color:#fff;letter-spacing:2px;opacity:.9;margin:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-size:90px;font-weight:200}.controls.jsx-5c6f10b709a2dea5{opacity:0;gap:15px;transition:opacity .4s;display:flex}.timer-container.jsx-5c6f10b709a2dea5:hover .controls.jsx-5c6f10b709a2dea5{opacity:.4}button.jsx-5c6f10b709a2dea5{color:#fff;cursor:pointer;letter-spacing:2px;background:0 0;border:1px solid #fff;border-radius:2px;padding:6px 18px;font-family:inherit;font-size:10px;font-weight:700;transition:all .2s}button.jsx-5c6f10b709a2dea5:hover{color:#000;background:#fff;opacity:1!important}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/meow/components/Timer.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/meow/components/HandTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HandTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function HandTracker({ onWave, isGreeting }) {
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDetected, setIsDetected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cameraError, setCameraError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCameraOff, setIsCameraOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const waveCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastWristX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastWaveTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isCameraOff) {
            setIsDetected(false);
            return;
        }
        let hands = null;
        let cameraStream = null;
        let animationId = 0;
        let isMounted = true;
        async function setupTracking() {
            // @ts-ignore
            const { Hands } = await __turbopack_context__.A("[project]/meow/node_modules/@mediapipe/hands/hands.js [app-ssr] (ecmascript, async loader)");
            const handsInstance = new Hands({
                locateFile: (file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            });
            handsInstance.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            const ctx = canvasRef.current?.getContext("2d");
            handsInstance.onResults((results)=>{
                if (!isMounted || !ctx || !canvasRef.current) return;
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    setIsDetected(true);
                    const landmarks = results.multiHandLandmarks[0];
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 4;
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
                    const connections = [
                        [
                            0,
                            1,
                            2,
                            3,
                            4
                        ],
                        [
                            0,
                            5,
                            6,
                            7,
                            8
                        ],
                        [
                            0,
                            9,
                            10,
                            11,
                            12
                        ],
                        [
                            0,
                            13,
                            14,
                            15,
                            16
                        ],
                        [
                            0,
                            17,
                            18,
                            19,
                            20
                        ],
                        [
                            5,
                            9,
                            13,
                            17,
                            0
                        ]
                    ];
                    connections.forEach((path)=>{
                        ctx.beginPath();
                        path.forEach((idx, i)=>{
                            const x = landmarks[idx].x * canvasRef.current.width;
                            const y = landmarks[idx].y * canvasRef.current.height;
                            if (i === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        });
                        ctx.stroke();
                    });
                    ctx.fillStyle = "white";
                    landmarks.forEach((p)=>{
                        ctx.beginPath();
                        ctx.arc(p.x * canvasRef.current.width, p.y * canvasRef.current.height, 3, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    const wristX = landmarks[0].x;
                    const now = Date.now();
                    if (lastWristX.current !== null) {
                        const deltaX = wristX - lastWristX.current;
                        if (Math.abs(deltaX) > 0.05 && now - lastWaveTime.current > 100) {
                            waveCount.current += 1;
                            lastWaveTime.current = now;
                            if (waveCount.current > 3) {
                                onWave();
                                waveCount.current = 0;
                            }
                        }
                    }
                    lastWristX.current = wristX;
                } else {
                    setIsDetected(false);
                    waveCount.current = 0;
                }
            });
            hands = handsInstance;
            try {
                cameraStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 640,
                        height: 480
                    },
                    audio: false
                });
                if (videoRef.current && isMounted) {
                    videoRef.current.srcObject = cameraStream;
                    videoRef.current.play();
                    const processFrame = async ()=>{
                        if (isMounted && videoRef.current && hands) {
                            if (videoRef.current.readyState >= 2) {
                                await hands.send({
                                    image: videoRef.current
                                });
                            }
                            animationId = requestAnimationFrame(processFrame);
                        }
                    };
                    processFrame();
                }
            } catch (err) {
                console.error("Camera access denied:", err);
                setCameraError(true);
            }
        }
        setupTracking();
        return ()=>{
            isMounted = false;
            cancelAnimationFrame(animationId);
            if (cameraStream) {
                cameraStream.getTracks().forEach((track)=>track.stop());
            }
            if (hands) {
                hands.close();
            }
        };
    }, [
        onWave,
        isCameraOff
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-10 bottom-10 w-80 flex flex-col items-end gap-3 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                className: "hidden",
                playsInline: true,
                autoPlay: true
            }, void 0, false, {
                fileName: "[project]/meow/components/HandTracker.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsCameraOff(!isCameraOff),
                className: "pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-1.5 h-1.5 rounded-full ${isCameraOff ? 'bg-red-500' : 'bg-green-500'} animate-pulse`
                    }, void 0, false, {
                        fileName: "[project]/meow/components/HandTracker.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-white/50 group-hover:text-white/80 uppercase tracking-widest font-medium",
                        children: isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'
                    }, void 0, false, {
                        fileName: "[project]/meow/components/HandTracker.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/meow/components/HandTracker.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `transition-all duration-500 pointer-events-none ${(isDetected || cameraError) && !isCameraOff ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[210px] w-full p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center animate-greeting-pop",
                    children: cameraError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center h-full text-center px-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/70 text-xs font-semibold tracking-wide",
                                children: "CAMERA ACCESS NEEDED"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/HandTracker.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white/30 text-[10px] mt-2",
                                children: "Enable camera permissions to use hand tracking"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/HandTracker.tsx",
                                lineNumber: 170,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/meow/components/HandTracker.tsx",
                        lineNumber: 166,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                width: 240,
                                height: 160,
                                className: "rounded-xl scale-x-[-1]"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/HandTracker.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[9px] text-white/40 uppercase tracking-[0.25em] mt-3 font-bold",
                                children: "Tracking Active"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/HandTracker.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/meow/components/HandTracker.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/meow/components/HandTracker.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/meow/components/HandTracker.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
}),
"[project]/meow/components/ActivityTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ActivityTracker({ onActivity }) {
    const [activity, setActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("connecting");
    // Tracking logic refs
    const lastActiveApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(Date.now());
    const saveDuration = ()=>{
        if (!lastActiveApp.current) return;
        const duration = Math.floor((Date.now() - startTime.current) / 1000);
        if (duration < 1) return;
        const saved = localStorage.getItem("meow_activity_history");
        let history = saved ? JSON.parse(saved) : [];
        const existingIdx = history.findIndex((h)=>h.app === lastActiveApp.current);
        if (existingIdx > -1) {
            history[existingIdx].duration += duration;
        } else {
            history.push({
                app: lastActiveApp.current,
                duration
            });
        }
        localStorage.setItem("meow_activity_history", JSON.stringify(history));
        startTime.current = Date.now();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // @ts-ignore
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            console.warn("Not running inside Electron");
            setStatus("disconnected");
        }
        const interval = setInterval(saveDuration, 5000);
        return ()=>{
            clearInterval(interval);
            saveDuration();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-10 top-10 w-80 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-[210px] p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-greeting-pop",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-white/5 pb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-2 h-2 rounded-full ${status === "connected" ? "bg-green-400 animate-pulse" : "bg-red-400"}`
                                }, void 0, false, {
                                    fileName: "[project]/meow/components/ActivityTracker.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-white/40 font-bold uppercase tracking-[0.25em]",
                                    children: "Activity Monitor"
                                }, void 0, false, {
                                    fileName: "[project]/meow/components/ActivityTracker.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/meow/components/ActivityTracker.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[7px] text-white/20 font-mono tracking-widest uppercase",
                            children: "Electron Live"
                        }, void 0, false, {
                            fileName: "[project]/meow/components/ActivityTracker.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/meow/components/ActivityTracker.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 flex-1 justify-center",
                    children: activity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold block mb-1",
                                        children: "Active Scope"
                                    }, void 0, false, {
                                        fileName: "[project]/meow/components/ActivityTracker.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white text-[15px] font-light tracking-tight truncate",
                                        children: activity.app
                                    }, void 0, false, {
                                        fileName: "[project]/meow/components/ActivityTracker.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/meow/components/ActivityTracker.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold block mb-1",
                                        children: "Header"
                                    }, void 0, false, {
                                        fileName: "[project]/meow/components/ActivityTracker.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white/60 text-[11px] font-light italic line-clamp-2",
                                        children: [
                                            '"',
                                            activity.title,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/meow/components/ActivityTracker.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/meow/components/ActivityTracker.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/meow/components/ActivityTracker.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-5 border-2 border-white/5 border-t-white/40 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/ActivityTracker.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] text-white/20 uppercase tracking-[0.2em]",
                                children: "Syncing Uplink..."
                            }, void 0, false, {
                                fileName: "[project]/meow/components/ActivityTracker.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/meow/components/ActivityTracker.tsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/meow/components/ActivityTracker.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-3 border-t border-white/5 text-[8px] text-white/10 font-mono flex justify-between uppercase tracking-widest italic",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: status.toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/meow/components/ActivityTracker.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "LOCAL IPC"
                        }, void 0, false, {
                            fileName: "[project]/meow/components/ActivityTracker.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/meow/components/ActivityTracker.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/meow/components/ActivityTracker.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/meow/components/ActivityTracker.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
"[project]/meow/components/ActivityHistory.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ActivityHistory() {
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadHistory = ()=>{
            const saved = localStorage.getItem("meow_activity_history");
            if (saved) {
                setHistory(JSON.parse(saved));
            }
        };
        loadHistory();
        // Refresh every 5 seconds to show updated durations
        const interval = setInterval(loadHistory, 5000);
        return ()=>clearInterval(interval);
    }, []);
    const formatDuration = (seconds)=>{
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor(seconds % 3600 / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-10 top-1/2 -translate-y-1/2 w-[320px] h-[440px] pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 animate-greeting-pop",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-white/5 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                                }, void 0, false, {
                                    fileName: "[project]/meow/components/ActivityHistory.tsx",
                                    lineNumber: 40,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-white/40 font-bold uppercase tracking-[0.25em]",
                                    children: "Session Analytics"
                                }, void 0, false, {
                                    fileName: "[project]/meow/components/ActivityHistory.tsx",
                                    lineNumber: 41,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/meow/components/ActivityHistory.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[8px] text-white/20 font-mono tracking-widest uppercase",
                            children: "LOG_ARCHIVE"
                        }, void 0, false, {
                            fileName: "[project]/meow/components/ActivityHistory.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/meow/components/ActivityHistory.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto pr-2 custom-scrollbar",
                    children: history.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: history.sort((a, b)=>b.duration - a.duration).map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group border-b border-white/[0.02] pb-3 last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/80 text-[13px] font-medium truncate max-w-[180px]",
                                                children: item.app
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/ActivityHistory.tsx",
                                                lineNumber: 57,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-400/80 font-mono text-[10px] mt-1",
                                                children: formatDuration(item.duration)
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/ActivityHistory.tsx",
                                                lineNumber: 60,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/meow/components/ActivityHistory.tsx",
                                        lineNumber: 56,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-white/5 h-[2px] rounded-full overflow-hidden mt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-400 h-full transition-all duration-1000",
                                            style: {
                                                width: `${Math.min(item.duration / 3600 * 100, 100)}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/meow/components/ActivityHistory.tsx",
                                            lineNumber: 65,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/meow/components/ActivityHistory.tsx",
                                        lineNumber: 64,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/meow/components/ActivityHistory.tsx",
                                lineNumber: 55,
                                columnNumber: 37
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/meow/components/ActivityHistory.tsx",
                        lineNumber: 51,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full flex flex-col items-center justify-center gap-3 opacity-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[32px]",
                                children: "📜"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/ActivityHistory.tsx",
                                lineNumber: 75,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] uppercase tracking-widest text-center",
                                children: "No cached session data found"
                            }, void 0, false, {
                                fileName: "[project]/meow/components/ActivityHistory.tsx",
                                lineNumber: 76,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/meow/components/ActivityHistory.tsx",
                        lineNumber: 74,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/meow/components/ActivityHistory.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-widest font-mono italic",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Total Focus"
                        }, void 0, false, {
                            fileName: "[project]/meow/components/ActivityHistory.tsx",
                            lineNumber: 83,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/40",
                            children: formatDuration(history.reduce((acc, curr)=>acc + curr.duration, 0))
                        }, void 0, false, {
                            fileName: "[project]/meow/components/ActivityHistory.tsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/meow/components/ActivityHistory.tsx",
                    lineNumber: 82,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/meow/components/ActivityHistory.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/meow/components/ActivityHistory.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
}),
"[project]/meow/components/Onboarding.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Onboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const steps = [
    {
        icon: "●",
        title: "Project Meow",
        description: "An advanced workstation companion designed to monitor and respond to your digital focus."
    },
    {
        icon: "○",
        title: "Kinetic Link",
        description: "Local neural processing for hand-gesture recognition and proximity awareness.",
        detail: "PRIVACY_SECURED / NO_DATA_EGRESS"
    },
    {
        icon: "◌",
        title: "Focus Uplink",
        description: "Behavioral analysis based on active application states and work-cycle patterns.",
        detail: "REQUIRES_TRACKER_SUBSYSTEM"
    }
];
function Onboarding({ onComplete }) {
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExiting, setIsExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsVisible(true);
    }, []);
    const handleNext = ()=>{
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev)=>prev + 1);
        } else {
            setIsExiting(true);
            setTimeout(onComplete, 800);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-fa577e290851012e" + " " + `fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ${isVisible && !isExiting ? "opacity-100" : "opacity-0"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                },
                className: "jsx-fa577e290851012e" + " " + "absolute inset-0 opacity-[0.03] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/meow/components/Onboarding.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-fa577e290851012e" + " " + "absolute inset-0 pointer-events-none overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-fa577e290851012e" + " " + "w-full h-[1px] bg-white/20 absolute top-0 animate-scan"
                }, void 0, false, {
                    fileName: "[project]/meow/components/Onboarding.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/meow/components/Onboarding.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-fa577e290851012e" + " " + "relative w-full max-w-2xl px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-fa577e290851012e" + " " + "absolute -top-12 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/40"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Onboarding.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-fa577e290851012e" + " " + "absolute -top-12 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/40"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Onboarding.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-fa577e290851012e" + " " + "absolute -bottom-12 -left-4 w-8 h-8 border-b-2 border-l-2 border-white/40"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Onboarding.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-fa577e290851012e" + " " + "absolute -bottom-12 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/40"
                    }, void 0, false, {
                        fileName: "[project]/meow/components/Onboarding.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-fa577e290851012e" + " " + "flex flex-col gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fa577e290851012e" + " " + "flex justify-between items-end border-b border-white/10 pb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-fa577e290851012e" + " " + "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fa577e290851012e" + " " + "text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase",
                                                children: "Status: Initializing"
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 70,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-fa577e290851012e" + " " + "flex gap-1",
                                                children: steps.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-fa577e290851012e" + " " + `h-1 transition-all duration-500 ${i <= currentStep ? "w-8 bg-white" : "w-4 bg-white/10"}`
                                                    }, i, false, {
                                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 71,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                        lineNumber: 69,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fa577e290851012e" + " " + "text-[10px] text-white/40 font-mono tracking-widest uppercase",
                                        children: [
                                            "Step_0",
                                            currentStep + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/meow/components/Onboarding.tsx",
                                lineNumber: 68,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fa577e290851012e" + " " + "grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start animate-fade-in-up",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-fa577e290851012e" + " " + "aspect-square flex items-center justify-center border border-white/20 text-6xl font-light text-white bg-white/[0.02]",
                                        children: steps[currentStep].icon
                                    }, void 0, false, {
                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-fa577e290851012e" + " " + "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "jsx-fa577e290851012e" + " " + "text-white text-5xl font-black tracking-tighter uppercase mb-4 leading-none",
                                                children: steps[currentStep].title
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 88,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-fa577e290851012e" + " " + "text-white/60 text-xl font-light leading-snug mb-8 max-w-md",
                                                children: steps[currentStep].description
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 91,
                                                columnNumber: 29
                                            }, this),
                                            steps[currentStep].detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-fa577e290851012e" + " " + "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-fa577e290851012e" + " " + "h-[1px] w-8 bg-white/20"
                                                    }, void 0, false, {
                                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-fa577e290851012e" + " " + "text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono",
                                                        children: steps[currentStep].detail
                                                    }, void 0, false, {
                                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 96,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                        lineNumber: 87,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, currentStep, true, {
                                fileName: "[project]/meow/components/Onboarding.tsx",
                                lineNumber: 81,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fa577e290851012e" + " " + "flex justify-between items-center pt-8 border-t border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-fa577e290851012e" + " " + "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fa577e290851012e" + " " + "text-[8px] text-white/20 font-mono uppercase tracking-[0.5em]",
                                                children: "System_Manifest_v1.0"
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 109,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-fa577e290851012e" + " " + "text-[8px] text-white/10 font-mono uppercase tracking-[0.5em]",
                                                children: "Auth: Established_Secure"
                                            }, void 0, false, {
                                                fileName: "[project]/meow/components/Onboarding.tsx",
                                                lineNumber: 110,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                        lineNumber: 108,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleNext,
                                        className: "jsx-fa577e290851012e" + " " + "group relative px-10 py-4 bg-white hover:bg-black border border-white transition-all duration-500 active:scale-95",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-fa577e290851012e" + " " + "text-black group-hover:text-white font-bold tracking-[0.3em] text-[11px] uppercase transition-colors duration-500",
                                            children: currentStep === steps.length - 1 ? "Initialize_System" : "Continue_Sequence"
                                        }, void 0, false, {
                                            fileName: "[project]/meow/components/Onboarding.tsx",
                                            lineNumber: 117,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/meow/components/Onboarding.tsx",
                                        lineNumber: 113,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/meow/components/Onboarding.tsx",
                                lineNumber: 107,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/meow/components/Onboarding.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/meow/components/Onboarding.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "fa577e290851012e",
                children: "@keyframes scan{0%{opacity:0;top:-10%}10%{opacity:1}90%{opacity:1}to{opacity:0;top:110%}}.animate-scan.jsx-fa577e290851012e{animation:4s linear infinite scan}@keyframes fade-in-up{0%{opacity:0;filter:blur(10px);transform:translateY(30px)}to{opacity:1;filter:blur();transform:translateY(0)}}.animate-fade-in-up.jsx-fa577e290851012e{animation:.8s cubic-bezier(.16,1,.3,1) forwards fade-in-up}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/meow/components/Onboarding.tsx",
        lineNumber: 48,
        columnNumber: 9
    }, this);
}
}),
"[project]/meow/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$cateyes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/components/cateyes.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$Timer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/components/Timer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$HandTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/components/HandTracker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$ActivityTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/components/ActivityTracker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$ActivityHistory$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/components/ActivityHistory.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$Onboarding$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/meow/components/Onboarding.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function Home() {
    const [mood, setMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("normal");
    const [isWaving, setIsWaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showOnboarding, setShowOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const hasSeen = localStorage.getItem("meow_onboarding_seen");
        if (hasSeen) setShowOnboarding(false);
    }, []);
    const handleOnboardingComplete = ()=>{
        localStorage.setItem("meow_onboarding_seen", "true");
        setShowOnboarding(false);
    };
    // 🎯 TIMER → mood
    const handleTimerStateChange = (state)=>{
        if (isWaving) return; // 👈 don't override waving
        switch(state){
            case "idle":
                setMood("normal");
                break;
            case "running":
                setMood("happy");
                break;
            case "paused":
                setMood("angry");
                break;
        }
    };
    // 👋 HAND WAVE → highest priority
    const handleWave = ()=>{
        setIsWaving(true);
        setMood("happy");
        setTimeout(()=>{
            setIsWaving(false);
            setMood("normal");
        }, 2000);
    };
    // 💻 ACTIVITY → smart mood
    const handleActivity = (activity)=>{
        if (isWaving) return; // 👈 don't override waving
        const app = activity.app.toLowerCase();
        const title = activity.title.toLowerCase();
        if (app.includes("code")) {
            setMood("happy"); // coding = good 😼
        } else if (title.includes("youtube")) {
            setMood("angry"); // distraction 😾
        } else {
            setMood("normal");
        }
    };
    if (showOnboarding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$Onboarding$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            onComplete: handleOnboardingComplete
        }, void 0, false, {
            fileName: "[project]/meow/app/page.tsx",
            lineNumber: 73,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col items-center justify-center bg-[#000] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            isWaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-32 left-1/2 -translate-x-1/2 z-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-2 animate-greeting-pop",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-medium tracking-[0.2em] text-sm whitespace-nowrap",
                                                children: "GREETINGS !!"
                                            }, void 0, false, {
                                                fileName: "[project]/meow/app/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/meow/app/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-4xl animate-wave-emoji",
                                            children: "👋"
                                        }, void 0, false, {
                                            fileName: "[project]/meow/app/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/meow/app/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/meow/app/page.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$cateyes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                baseMood: mood
                            }, void 0, false, {
                                fileName: "[project]/meow/app/page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/meow/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$Timer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onStateChange: handleTimerStateChange
                    }, void 0, false, {
                        fileName: "[project]/meow/app/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$HandTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onWave: handleWave
                    }, void 0, false, {
                        fileName: "[project]/meow/app/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/meow/app/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$ActivityTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onActivity: handleActivity
            }, void 0, false, {
                fileName: "[project]/meow/app/page.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$components$2f$ActivityHistory$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/meow/app/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowOnboarding(true),
                className: "fixed left-8 top-8 p-3 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md opacity-20 hover:opacity-100 hover:bg-white/10 transition-all duration-500 z-50 group flex items-center gap-2",
                title: "View Onboarding",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[10px] text-white/40 group-hover:text-white font-mono tracking-widest uppercase px-2 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$meow$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-1.5 h-1.5 rounded-full bg-blue-400/40 group-hover:bg-blue-400 transition-colors"
                        }, void 0, false, {
                            fileName: "[project]/meow/app/page.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        "RECALL_INTERFACE_GUIDE"
                    ]
                }, void 0, true, {
                    fileName: "[project]/meow/app/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/meow/app/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/meow/app/page.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7aa75981._.js.map