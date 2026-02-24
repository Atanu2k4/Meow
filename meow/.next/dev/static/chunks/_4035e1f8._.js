(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/cateyes.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CatEyes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CatEyes({ baseMood }) {
    _s();
    const [currentMood, setCurrentMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(baseMood);
    const [pupilOffset, setPupilOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("initial");
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle Mounting
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatEyes.useEffect": ()=>{
            setIsMounted(true);
        }
    }["CatEyes.useEffect"], []);
    // Refs for managing timeouts to avoid collisions/leaks
    const blinkTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const behaviorTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle Animation Sequence
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatEyes.useEffect": ()=>{
            if (!isMounted) return;
            // 1. Show eyes for 2s (Phase: initial)
            const timer1 = setTimeout({
                "CatEyes.useEffect.timer1": ()=>{
                    setPhase("greeting");
                }
            }["CatEyes.useEffect.timer1"], 2000);
            // 2. Show greeting for 3s (Phase: greeting)
            // Total wait: 2s + 3s = 5s
            const timer2 = setTimeout({
                "CatEyes.useEffect.timer2": ()=>{
                    setPhase("active");
                }
            }["CatEyes.useEffect.timer2"], 5000);
            return ({
                "CatEyes.useEffect": ()=>{
                    clearTimeout(timer1);
                    clearTimeout(timer2);
                }
            })["CatEyes.useEffect"];
        }
    }["CatEyes.useEffect"], [
        isMounted
    ]);
    // Sync prop changes to state (base mood changes)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatEyes.useEffect": ()=>{
            if (phase !== "active") return;
            setCurrentMood({
                "CatEyes.useEffect": (prev)=>prev === "blink" ? prev : baseMood
            }["CatEyes.useEffect"]);
            setRotation(0); // Reset rotation on mood change
        }
    }["CatEyes.useEffect"], [
        baseMood,
        phase
    ]);
    // 1. Independent Blink Loop (Human-like timing)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatEyes.useEffect": ()=>{
            if (phase !== "active") return;
            const blinkLoop = {
                "CatEyes.useEffect.blinkLoop": ()=>{
                    const nextBlink = Math.random() * 4000 + 2000;
                    blinkTimeoutRef.current = setTimeout({
                        "CatEyes.useEffect.blinkLoop": ()=>{
                            const prevMoodBeforeBlink = currentMood;
                            setCurrentMood("blink");
                            setTimeout({
                                "CatEyes.useEffect.blinkLoop": ()=>{
                                    setCurrentMood(prevMoodBeforeBlink === "blink" ? baseMood : prevMoodBeforeBlink);
                                    if (Math.random() < 0.1) {
                                        setTimeout({
                                            "CatEyes.useEffect.blinkLoop": ()=>{
                                                setCurrentMood("blink");
                                                setTimeout({
                                                    "CatEyes.useEffect.blinkLoop": ()=>setCurrentMood(prevMoodBeforeBlink)
                                                }["CatEyes.useEffect.blinkLoop"], 150);
                                            }
                                        }["CatEyes.useEffect.blinkLoop"], 100);
                                    }
                                    blinkLoop();
                                }
                            }["CatEyes.useEffect.blinkLoop"], 150);
                        }
                    }["CatEyes.useEffect.blinkLoop"], nextBlink);
                }
            }["CatEyes.useEffect.blinkLoop"];
            blinkLoop();
            return ({
                "CatEyes.useEffect": ()=>{
                    if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
                }
            })["CatEyes.useEffect"];
        }
    }["CatEyes.useEffect"], [
        baseMood,
        phase,
        currentMood
    ]);
    // 2. Behavioral Overhaul (Flapping moods, complex scanning, and thinking)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatEyes.useEffect": ()=>{
            if (phase !== "active") return;
            const behaviorLoop = {
                "CatEyes.useEffect.behaviorLoop": ()=>{
                    const delay = Math.random() * 2000 + 1000; // Faster intervals for more life
                    behaviorTimeoutRef.current = setTimeout({
                        "CatEyes.useEffect.behaviorLoop": ()=>{
                            const action = Math.random();
                            // A. Complex Eye Movements (50% chance)
                            if (action < 0.5) {
                                const subAction = Math.random();
                                // 1. Double Scan (left then right)
                                if (subAction < 0.25) {
                                    const firstDir = Math.random() > 0.5 ? 30 : -30;
                                    setPupilOffset({
                                        x: firstDir,
                                        y: 0
                                    });
                                    setTimeout({
                                        "CatEyes.useEffect.behaviorLoop": ()=>{
                                            setPupilOffset({
                                                x: -firstDir,
                                                y: 0
                                            });
                                            setTimeout({
                                                "CatEyes.useEffect.behaviorLoop": ()=>setPupilOffset({
                                                        x: 0,
                                                        y: 0
                                                    })
                                            }["CatEyes.useEffect.behaviorLoop"], 500);
                                        }
                                    }["CatEyes.useEffect.behaviorLoop"], 700);
                                } else if (subAction < 0.45) {
                                    setPupilOffset({
                                        x: -35,
                                        y: 5
                                    });
                                    setTimeout({
                                        "CatEyes.useEffect.behaviorLoop": ()=>{
                                            setPupilOffset({
                                                x: 35,
                                                y: -5
                                            });
                                            setTimeout({
                                                "CatEyes.useEffect.behaviorLoop": ()=>setPupilOffset({
                                                        x: 0,
                                                        y: 0
                                                    })
                                            }["CatEyes.useEffect.behaviorLoop"], 800);
                                        }
                                    }["CatEyes.useEffect.behaviorLoop"], 1000);
                                } else if (subAction < 0.65) {
                                    const side = Math.random() > 0.5 ? 20 : -20;
                                    setPupilOffset({
                                        x: side,
                                        y: -30
                                    });
                                    setTimeout({
                                        "CatEyes.useEffect.behaviorLoop": ()=>setPupilOffset({
                                                x: 0,
                                                y: 0
                                            })
                                    }["CatEyes.useEffect.behaviorLoop"], 1200);
                                } else if (subAction < 0.8) {
                                    setPupilOffset({
                                        x: 0,
                                        y: 20
                                    });
                                    setTimeout({
                                        "CatEyes.useEffect.behaviorLoop": ()=>setPupilOffset({
                                                x: 0,
                                                y: 0
                                            })
                                    }["CatEyes.useEffect.behaviorLoop"], 400);
                                } else {
                                    const rx = (Math.random() - 0.5) * 40;
                                    const ry = (Math.random() - 0.5) * 20;
                                    setPupilOffset({
                                        x: rx,
                                        y: ry
                                    });
                                    setTimeout({
                                        "CatEyes.useEffect.behaviorLoop": ()=>{
                                            setPupilOffset({
                                                x: -rx / 2,
                                                y: -ry / 2
                                            });
                                            setTimeout({
                                                "CatEyes.useEffect.behaviorLoop": ()=>setPupilOffset({
                                                        x: 0,
                                                        y: 0
                                                    })
                                            }["CatEyes.useEffect.behaviorLoop"], 200);
                                        }
                                    }["CatEyes.useEffect.behaviorLoop"], 200);
                                }
                            } else if (action < 0.8) {
                                const variation = Math.random();
                                if (baseMood === "happy") {
                                    if (variation < 0.4) {
                                        setCurrentMood("normal");
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>setCurrentMood("happy")
                                        }["CatEyes.useEffect.behaviorLoop"], 2000);
                                    } else if (variation < 0.7) {
                                        setCurrentMood("squint");
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>setCurrentMood("happy")
                                        }["CatEyes.useEffect.behaviorLoop"], 1500);
                                    } else {
                                        setCurrentMood("surprised");
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>setCurrentMood("happy")
                                        }["CatEyes.useEffect.behaviorLoop"], 800);
                                    }
                                } else if (baseMood === "normal") {
                                    if (variation < 0.35) {
                                        setCurrentMood("curious");
                                        setRotation(variation < 0.17 ? 15 : -15);
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>{
                                                setCurrentMood("normal");
                                                setRotation(0);
                                            }
                                        }["CatEyes.useEffect.behaviorLoop"], 1500);
                                    } else if (variation < 0.5) {
                                        setCurrentMood("annoyed");
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>setCurrentMood("normal")
                                        }["CatEyes.useEffect.behaviorLoop"], 2000);
                                    } else if (variation < 0.6) {
                                        setCurrentMood("sleeping");
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>setCurrentMood("normal")
                                        }["CatEyes.useEffect.behaviorLoop"], 3000);
                                    }
                                } else if (baseMood === "angry") {
                                    if (variation < 0.5) {
                                        setCurrentMood("narrow");
                                        setTimeout({
                                            "CatEyes.useEffect.behaviorLoop": ()=>setCurrentMood("angry")
                                        }["CatEyes.useEffect.behaviorLoop"], 1500);
                                    }
                                }
                            }
                            behaviorLoop();
                        }
                    }["CatEyes.useEffect.behaviorLoop"], delay);
                }
            }["CatEyes.useEffect.behaviorLoop"];
            behaviorLoop();
            return ({
                "CatEyes.useEffect": ()=>{
                    if (behaviorTimeoutRef.current) clearTimeout(behaviorTimeoutRef.current);
                }
            })["CatEyes.useEffect"];
        }
    }["CatEyes.useEffect"], [
        baseMood,
        phase
    ]);
    if (!isMounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            transform: `rotate(${rotation}deg) translateY(${phase === "active" ? "-5px" : "0px"})`,
            animation: phase === "active" ? 'float-container 4s ease-in-out infinite' : 'none'
        },
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
            [
                "3ee7bb751e9d533d",
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
        ]) + " " + "eyes-container relative transition-all duration-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    opacity: phase === "greeting" ? 1 : 0
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3ee7bb751e9d533d",
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
                fileName: "[project]/components/cateyes.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3ee7bb751e9d533d",
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
                ]) + " " + `eye left ${currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`
            }, void 0, false, {
                fileName: "[project]/components/cateyes.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3ee7bb751e9d533d",
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
                ]) + " " + `eye right ${currentMood} ${phase === "greeting" ? "hidden-eye" : ""}`
            }, void 0, false, {
                fileName: "[project]/components/cateyes.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            phase === "active" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "3ee7bb751e9d533d",
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
                fileName: "[project]/components/cateyes.tsx",
                lineNumber: 214,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "3ee7bb751e9d533d",
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
                children: `@keyframes float-container{0%,to{transform:rotate(${rotation}deg)translateY(-5px)}50%{transform:rotate(${rotation}deg)translateY(5px)}}.eyes-container.__jsx-style-dynamic-selector{justify-content:center;align-items:center;gap:30px;min-height:100px;margin-bottom:20px;display:flex;position:relative}.greeting.__jsx-style-dynamic-selector{font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif;color:#fff;opacity:0;letter-spacing:-.04em;white-space:nowrap;pointer-events:none;font-size:36px;font-weight:300;transition:all .9s cubic-bezier(.22,1,.36,1);position:absolute;transform:translateY(10px)}.greeting.visible.__jsx-style-dynamic-selector{opacity:1;transform:translateY(0)}.exclamation.__jsx-style-dynamic-selector{color:#fff;opacity:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-size:60px;font-weight:900;transition:all .3s cubic-bezier(.175,.885,.32,1.275);position:absolute;top:-60px;left:calc(50% + 60px);transform:translate(-50%)rotate(10deg)}.exclamation.visible.__jsx-style-dynamic-selector{opacity:1;top:-90px;transform:translate(-50%)rotate(15deg)scale(1.2)}@keyframes float{0%,to{transform:translate(${pupilOffset.x}px,${pupilOffset.y}px)}50%{transform:translate(${pupilOffset.x}px,${pupilOffset.y}px)translateY(-3px)}}.eye.__jsx-style-dynamic-selector{opacity:1;width:90px;height:90px;transform:translate(${pupilOffset.x}px,${pupilOffset.y}px);background:#fff;border-radius:18px;transition:all .6s cubic-bezier(.34,1.56,.64,1);animation:4s ease-in-out infinite float;position:relative;overflow:hidden}.hidden-eye.__jsx-style-dynamic-selector{opacity:0;pointer-events:none;transform:translateY(20px)scale(.5)}.eye.blink.__jsx-style-dynamic-selector{transform:translate(0)!important}.normal.__jsx-style-dynamic-selector{border-radius:18px;height:90px}.happy.__jsx-style-dynamic-selector{border-radius:50% 50% 12px 12px;height:50px;margin-top:20px;transform:scaleX(1.1)}.happy.__jsx-style-dynamic-selector:after{content:"";background:#000;border-radius:50% 50% 0 0;width:100%;height:40%;position:absolute;bottom:0;left:0}.squint.__jsx-style-dynamic-selector{border-radius:50% 50% 12px 12px;height:30px;margin-top:40px;transform:scaleX(1.15)}.squint.__jsx-style-dynamic-selector:after{content:"";background:#000;border-radius:50% 50% 0 0;width:100%;height:50%;position:absolute;bottom:0;left:0}.angry.__jsx-style-dynamic-selector{border-radius:12px;height:80px}.angry.left.__jsx-style-dynamic-selector{transform:rotate(-15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.angry.right.__jsx-style-dynamic-selector{transform:rotate(15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.angry.__jsx-style-dynamic-selector:before{content:"";background:#000;height:50px;position:absolute;top:-20px;left:-20px;right:-20px;transform:rotate(10deg)}.angry.right.__jsx-style-dynamic-selector:before{transform:rotate(-10deg)}.narrow.__jsx-style-dynamic-selector{border-radius:8px;height:50px}.narrow.left.__jsx-style-dynamic-selector{transform:rotate(-15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.narrow.right.__jsx-style-dynamic-selector{transform:rotate(15deg)translate(${pupilOffset.x}px,${pupilOffset.y}px)}.narrow.__jsx-style-dynamic-selector:before{content:"";background:#000;height:50px;position:absolute;top:-20px;left:-20px;right:-20px;transform:rotate(10deg)}.narrow.right.__jsx-style-dynamic-selector:before{transform:rotate(-10deg)}.sad.__jsx-style-dynamic-selector{border-radius:40% 40% 20% 20%;height:70px;margin-top:10px}.sad.__jsx-style-dynamic-selector:after{content:"";background:#0000001a;width:100%;height:30%;position:absolute;top:0;left:0}.annoyed.__jsx-style-dynamic-selector{border-radius:4px 4px 18px 18px;height:45px;margin-top:22px}.curious.__jsx-style-dynamic-selector{border-radius:35%;width:95px;height:95px}.sleeping.__jsx-style-dynamic-selector{opacity:.6;border-radius:2px;margin-top:60px;width:80px!important;height:4px!important}.surprised.__jsx-style-dynamic-selector{border-radius:50%;width:100px;height:100px;transform:scale(1.1)}.blink.__jsx-style-dynamic-selector{border-radius:2px;margin-top:43px;width:90px!important;height:4px!important}.blink.__jsx-style-dynamic-selector:before,.blink.__jsx-style-dynamic-selector:after{display:none}`
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/cateyes.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(CatEyes, "Jf1LklfbuSrDvVwDGVWn77tlUwQ=");
_c = CatEyes;
var _c;
__turbopack_context__.k.register(_c, "CatEyes");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Timer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Timer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Timer({ onStateChange }) {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Timer.useEffect": ()=>{
            setIsMounted(true);
        }
    }["Timer.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            opacity: isMounted ? 1 : 0,
            transition: "opacity 1s ease 5s" // Delay until eyes are active
        },
        className: "jsx-5c6f10b709a2dea5" + " " + "timer-container uppercase",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "jsx-5c6f10b709a2dea5" + " " + "timer-display",
                children: formatTime(time)
            }, void 0, false, {
                fileName: "[project]/components/Timer.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-5c6f10b709a2dea5" + " " + "controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: start,
                        className: "jsx-5c6f10b709a2dea5",
                        children: "START"
                    }, void 0, false, {
                        fileName: "[project]/components/Timer.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: pause,
                        className: "jsx-5c6f10b709a2dea5",
                        children: "PAUSE"
                    }, void 0, false, {
                        fileName: "[project]/components/Timer.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "jsx-5c6f10b709a2dea5",
                        children: "RESET"
                    }, void 0, false, {
                        fileName: "[project]/components/Timer.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Timer.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "5c6f10b709a2dea5",
                children: ".timer-container.jsx-5c6f10b709a2dea5{flex-direction:column;align-items:center;gap:30px;margin-top:20px;display:flex}.timer-display.jsx-5c6f10b709a2dea5{color:#fff;letter-spacing:2px;opacity:.9;margin:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-size:90px;font-weight:200}.controls.jsx-5c6f10b709a2dea5{opacity:0;gap:15px;transition:opacity .4s;display:flex}.timer-container.jsx-5c6f10b709a2dea5:hover .controls.jsx-5c6f10b709a2dea5{opacity:.4}button.jsx-5c6f10b709a2dea5{color:#fff;cursor:pointer;letter-spacing:2px;background:0 0;border:1px solid #fff;border-radius:2px;padding:6px 18px;font-family:inherit;font-size:10px;font-weight:700;transition:all .2s}button.jsx-5c6f10b709a2dea5:hover{color:#000;background:#fff;opacity:1!important}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Timer.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(Timer, "gy4ONPEyryAHxmhv5mn51KZQP2g=");
_c = Timer;
var _c;
__turbopack_context__.k.register(_c, "Timer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/HandTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HandTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mediapipe$2f$hands$2f$hands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mediapipe/hands/hands.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mediapipe$2f$camera_utils$2f$camera_utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mediapipe/camera_utils/camera_utils.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function HandTracker({ onWave, isGreeting }) {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDetected, setIsDetected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Wave detection states
    const waveCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastWristX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastWaveTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HandTracker.useEffect": ()=>{
            if (!videoRef.current || !canvasRef.current) return;
            const hands = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mediapipe$2f$hands$2f$hands$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hands"]({
                locateFile: {
                    "HandTracker.useEffect": (file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
                }["HandTracker.useEffect"]
            });
            hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            const ctx = canvasRef.current.getContext("2d");
            hands.onResults({
                "HandTracker.useEffect": (results)=>{
                    if (!ctx || !canvasRef.current) return;
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                        setIsDetected(true);
                        const landmarks = results.multiHandLandmarks[0];
                        // --- DRAW HAND ASSET (5 FINGERS) ---
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 4;
                        ctx.lineCap = "round";
                        ctx.lineJoin = "round";
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
                        // Connections for 5 fingers
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
                            ] // Palm base
                        ];
                        connections.forEach({
                            "HandTracker.useEffect": (path)=>{
                                ctx.beginPath();
                                path.forEach({
                                    "HandTracker.useEffect": (idx, i)=>{
                                        const x = landmarks[idx].x * canvasRef.current.width;
                                        const y = landmarks[idx].y * canvasRef.current.height;
                                        if (i === 0) ctx.moveTo(x, y);
                                        else ctx.lineTo(x, y);
                                    }
                                }["HandTracker.useEffect"]);
                                ctx.stroke();
                            }
                        }["HandTracker.useEffect"]);
                        // Draw points for joints
                        ctx.fillStyle = "white";
                        landmarks.forEach({
                            "HandTracker.useEffect": (p)=>{
                                ctx.beginPath();
                                ctx.arc(p.x * canvasRef.current.width, p.y * canvasRef.current.height, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }["HandTracker.useEffect"]);
                        // --- WAVE DETECTION ---
                        const wristX = landmarks[0].x;
                        const now = Date.now();
                        if (lastWristX.current !== null) {
                            const deltaX = wristX - lastWristX.current;
                            // If moving fast horizontally
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
                }
            }["HandTracker.useEffect"]);
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mediapipe$2f$camera_utils$2f$camera_utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Camera"](videoRef.current, {
                onFrame: {
                    "HandTracker.useEffect": async ()=>{
                        if (videoRef.current) {
                            await hands.send({
                                image: videoRef.current
                            });
                        }
                    }
                }["HandTracker.useEffect"],
                width: 640,
                height: 480
            });
            camera.start();
            return ({
                "HandTracker.useEffect": ()=>{
                    camera.stop();
                    hands.close();
                }
            })["HandTracker.useEffect"];
        }
    }["HandTracker.useEffect"], [
        onWave
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hand-container fixed bottom-8 right-8 pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                className: "hidden",
                playsInline: true,
                autoPlay: true
            }, void 0, false, {
                fileName: "[project]/components/HandTracker.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `transition-opacity duration-500 ${isDetected ? 'opacity-100' : 'opacity-0'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        width: 280,
                        height: 210,
                        className: "rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/components/HandTracker.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-white/40 uppercase tracking-[2px] mt-2 text-center",
                        children: "Hand Tracking Active"
                    }, void 0, false, {
                        fileName: "[project]/components/HandTracker.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HandTracker.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/HandTracker.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(HandTracker, "DzYcG+mgpi9psupsGtyIlZOXZp0=");
_c = HandTracker;
var _c;
__turbopack_context__.k.register(_c, "HandTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cateyes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/cateyes.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Timer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Timer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HandTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/HandTracker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Home() {
    _s();
    const [mood, setMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("normal");
    const [isWaving, setIsWaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleTimerStateChange = (state)=>{
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
    const handleWave = ()=>{
        setMood("happy");
        setIsWaving(true);
        setTimeout(()=>setIsWaving(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col items-center justify-center bg-[#000] overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        isWaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-24 left-1/2 -translate-x-1/2 text-white font-bold text-4xl animate-bounce",
                            children: "HI !! 👋"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cateyes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            baseMood: mood
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Timer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onStateChange: handleTimerStateChange
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HandTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onWave: handleWave
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(Home, "Tcc1cKaMpcuBRJWb2F1TwsYYj2U=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4035e1f8._.js.map