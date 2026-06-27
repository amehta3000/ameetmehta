"use client";
import React, { useRef, useEffect, useState } from "react";

// ============ SPACE RICKSHAW — a C64-style tribute to Space Taxi ============
// Fly a bajaj auto-rickshaw through neo-retro India. Soft landings only, ji!

const W = 320, H = 200, SCALE = 3;

const C = {
  black: "#000000", white: "#FFFFFF", red: "#883932", cyan: "#67B6BD",
  purple: "#8B3F96", green: "#55A049", blue: "#40318D", yellow: "#BFCE72",
  orange: "#8B5429", brown: "#574200", ltred: "#B86962", dgrey: "#505050",
  grey: "#787878", ltgreen: "#94E089", ltblue: "#7869C4", ltgrey: "#9F9F9F",
};

const LEVELS = [
  {
    name: "MUMBAI — MARINE DRIVE",
    sky: C.blue, ground: C.dgrey, accent: C.yellow,
    fares: 3, gravity: 0.02,
    solids: [
      { x: 0, y: 188, w: 320, h: 12, c: C.dgrey },
      { x: 24, y: 96, w: 34, h: 92, c: C.grey, win: true },
      { x: 70, y: 128, w: 30, h: 60, c: C.dgrey, win: true },
      { x: 196, y: 110, w: 36, h: 78, c: C.grey, win: true },
      { x: 262, y: 70, w: 34, h: 118, c: C.dgrey, win: true },
      { x: 130, y: 152, w: 44, h: 36, c: C.grey, win: true },
    ],
    pads: [
      { x: 24, y: 96, w: 34, n: 1 },
      { x: 130, y: 152, w: 44, n: 2 },
      { x: 196, y: 110, w: 36, n: 3 },
      { x: 262, y: 70, w: 34, n: 4 },
      { x: 70, y: 128, w: 30, n: 0 },
    ],
    deco: "sea",
  },
  {
    name: "VARANASI — THE GHATS",
    sky: C.purple, ground: C.brown, accent: C.orange,
    fares: 3, gravity: 0.023,
    solids: [
      { x: 0, y: 188, w: 320, h: 12, c: C.brown },
      { x: 0, y: 170, w: 70, h: 18, c: C.brown },
      { x: 0, y: 152, w: 50, h: 18, c: C.orange },
      { x: 0, y: 134, w: 30, h: 18, c: C.brown },
      { x: 120, y: 120, w: 26, h: 68, c: C.ltred, win: true },
      { x: 126, y: 104, w: 14, h: 16, c: C.ltred },
      { x: 180, y: 160, w: 40, h: 28, c: C.orange, win: true },
      { x: 250, y: 130, w: 34, h: 58, c: C.ltred, win: true },
      { x: 290, y: 96, w: 30, h: 92, c: C.brown, win: true },
    ],
    pads: [
      { x: 0, y: 134, w: 30, n: 1 },
      { x: 180, y: 160, w: 40, n: 2 },
      { x: 250, y: 130, w: 34, n: 3 },
      { x: 290, y: 96, w: 30, n: 4 },
      { x: 0, y: 152, w: 50, n: 0, ox: 30, ow: 20 },
    ],
    deco: "river",
  },
  {
    name: "GOA — BAGA BEACH",
    sky: C.cyan, ground: C.yellow, accent: C.green,
    fares: 4, gravity: 0.026,
    solids: [
      { x: 0, y: 188, w: 320, h: 12, c: C.yellow },
      { x: 30, y: 140, w: 8, h: 48, c: C.brown },
      { x: 100, y: 150, w: 8, h: 38, c: C.brown },
      { x: 60, y: 120, w: 56, h: 10, c: C.brown },
      { x: 160, y: 156, w: 46, h: 32, c: C.ltred, win: true },
      { x: 230, y: 100, w: 12, h: 88, c: C.dgrey },
      { x: 218, y: 92, w: 36, h: 10, c: C.red },
      { x: 282, y: 140, w: 38, h: 48, c: C.grey, win: true },
    ],
    pads: [
      { x: 60, y: 120, w: 56, n: 1 },
      { x: 160, y: 156, w: 46, n: 2 },
      { x: 218, y: 92, w: 36, n: 3 },
      { x: 282, y: 140, w: 38, n: 4 },
      { x: 0, y: 188, w: 40, n: 0 },
    ],
    deco: "sea",
  },
  {
    name: "DELHI — CHANDNI CHOWK",
    sky: C.black, ground: C.dgrey, accent: C.ltblue,
    fares: 4, gravity: 0.029,
    solids: [
      { x: 0, y: 188, w: 320, h: 12, c: C.dgrey },
      { x: 10, y: 60, w: 40, h: 128, c: C.grey, win: true },
      { x: 60, y: 110, w: 36, h: 78, c: C.dgrey, win: true },
      { x: 106, y: 80, w: 14, h: 108, c: C.ltgrey },
      { x: 102, y: 72, w: 22, h: 10, c: C.ltgrey },
      { x: 150, y: 130, w: 50, h: 58, c: C.grey, win: true },
      { x: 214, y: 90, w: 40, h: 98, c: C.dgrey, win: true },
      { x: 268, y: 50, w: 44, h: 138, c: C.grey, win: true },
      { x: 130, y: 40, w: 60, h: 8, c: C.dgrey },
    ],
    pads: [
      { x: 10, y: 60, w: 40, n: 1 },
      { x: 150, y: 130, w: 50, n: 2 },
      { x: 130, y: 40, w: 60, n: 3 },
      { x: 268, y: 50, w: 44, n: 4 },
      { x: 60, y: 110, w: 36, n: 0 },
    ],
    deco: "stars",
  },
  {
    name: "HIMALAYA — LEH HIGHWAY",
    sky: C.ltblue, ground: C.white, accent: C.white,
    fares: 5, gravity: 0.032,
    solids: [
      { x: 0, y: 188, w: 320, h: 12, c: C.white },
      { x: 0, y: 120, w: 60, h: 68, c: C.grey },
      { x: 0, y: 100, w: 34, h: 20, c: C.ltgrey },
      { x: 90, y: 150, w: 50, h: 38, c: C.grey },
      { x: 150, y: 64, w: 16, h: 60, c: C.ltgrey },
      { x: 140, y: 56, w: 36, h: 10, c: C.red },
      { x: 200, y: 120, w: 44, h: 68, c: C.grey },
      { x: 262, y: 80, w: 58, h: 108, c: C.ltgrey, win: true },
    ],
    pads: [
      { x: 0, y: 100, w: 34, n: 1 },
      { x: 90, y: 150, w: 50, n: 2 },
      { x: 140, y: 56, w: 36, n: 3 },
      { x: 262, y: 80, w: 58, n: 4 },
      { x: 200, y: 120, w: 44, n: 0 },
    ],
    deco: "stars",
  },
];

function makeAudio() {
  let ctx: AudioContext | null = null;
  const ensure = () => {
    if (!ctx) { try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch (e) { /* no audio */ } }
    return ctx;
  };
  const blip = (freq: number, dur = 0.08, type: OscillatorType = "square", vol = 0.06) => {
    const ac = ensure(); if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + dur);
  };
  let thrustNode: { o: OscillatorNode; g: GainNode } | null = null;
  const thrust = (on: boolean) => {
    const ac = ensure(); if (!ac) return;
    if (on && !thrustNode) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = "sawtooth"; o.frequency.value = 42;
      g.gain.value = 0.035;
      o.connect(g); g.connect(ac.destination); o.start();
      thrustNode = { o, g };
    } else if (!on && thrustNode) {
      try { thrustNode.o.stop(); } catch (e) {}
      thrustNode = null;
    }
  };
  const speak = (phrase: string) => {
    try {
      if (!window.speechSynthesis) return;
      const u = new SpeechSynthesisUtterance(phrase);
      const voices = window.speechSynthesis.getVoices();
      const v = voices.find((v) => /en[-_]IN/i.test(v.lang)) ||
                voices.find((v) => /hi[-_]IN/i.test(v.lang)) ||
                voices.find((v) => /IN/i.test(v.lang));
      if (v) u.voice = v;
      u.lang = v ? v.lang : "en-IN";
      u.rate = 1.15; u.pitch = 1.9; u.volume = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* no speech support */ }
  };
  return { blip, thrust, speak };
}

export default function SpaceRickshaw() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const ctrl = useRef<Record<string, () => void>>({});
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  mutedRef.current = muted;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    const audio = makeAudio();
    try { window.speechSynthesis && window.speechSynthesis.getVoices(); } catch (e) {}

    const G: any = {
      mode: "title",
      level: 0, lives: 3, rupees: 0,
      faresDone: 0, msg: "", msgT: 0, flash: 0,
      stars: Array.from({ length: 40 }, () => [Math.random() * W, Math.random() * 110]),
    };
    const R: any = { x: 0, y: 0, vx: 0, vy: 0, fuel: 100, landedPad: null, facing: 1, gear: true };
    const P: any = { state: "none", pad: null, dest: null, x: 0, y: 0, t: 0 };
    let parts: any[] = [];
    let t = 0;

    const lv = () => LEVELS[G.level];
    const padTop = (p: any) => p.y;

    function resetShaw() {
      const fuelPad = lv().pads.find((p: any) => p.n === 0)!;
      R.x = fuelPad.x + (fuelPad.ox || 0) + (fuelPad.ow || fuelPad.w) / 2;
      R.y = padTop(fuelPad) - 7;
      R.vx = 0; R.vy = 0; R.landedPad = fuelPad; R.fuel = 100; R.gear = true;
    }

    function newFare() {
      const cands = lv().pads.filter((p: any) => p.n > 0 && p !== R.landedPad);
      const from = cands[Math.floor(Math.random() * cands.length)];
      let to: any;
      do { to = lv().pads[Math.floor(Math.random() * lv().pads.length)]; }
      while (to.n === 0 || to === from);
      P.state = "waiting"; P.pad = from; P.dest = to;
      P.x = from.x + (from.ox || 0) + (from.ow || from.w) / 2; P.y = padTop(from);
      say(`"RICKSHAW!" — PAD ${from.n}`);
      if (!mutedRef.current) audio.speak("Rickshaw!");
    }

    function say(s: string, long?: boolean) { G.msg = s; G.msgT = long ? 260 : 150; }

    function startLevel(n: number) {
      G.level = n; G.faresDone = 0; P.state = "none";
      resetShaw(); newFare();
      say(lv().name, true);
      G.mode = "play";
    }

    function explode() {
      if (!mutedRef.current) audio.blip(60, 0.5, "sawtooth", 0.15);
      audio.thrust(false);
      for (let i = 0; i < 26; i++)
        parts.push({ x: R.x, y: R.y, vx: (Math.random() - 0.5) * 2.4, vy: (Math.random() - 0.7) * 2.2, life: 50 + Math.random() * 30, c: [C.yellow, C.orange, C.red, C.white][i % 4] });
      G.lives--; G.flash = 8;
      G.mode = G.lives <= 0 ? "gameover" : "dead";
      G.msgT = 0;
    }

    function update() {
      t++;
      if (G.msgT > 0) G.msgT--;
      if (G.flash > 0) G.flash--;
      parts.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life--; });
      parts = parts.filter((p) => p.life > 0);

      if (G.mode === "dead" && parts.length === 0) { resetShaw(); if (P.state === "riding") { P.state = "waiting"; P.x = P.pad.x + (P.pad.ox||0) + (P.pad.ow||P.pad.w)/2; P.y = padTop(P.pad); } G.mode = "play"; }
      if (G.mode !== "play") { audio.thrust(false); return; }

      const k = keys.current;
      const thrustUp = (k.ArrowUp || k.w) && R.fuel > 0;
      const left = (k.ArrowLeft || k.a) && R.fuel > 0 && !R.gear;
      const right = (k.ArrowRight || k.d) && R.fuel > 0 && !R.gear;

      if (R.fuel <= 0 && R.landedPad && R.landedPad.n !== 0) {
        say("OUT OF GAS! PRESS R TO CALL MECHANIC", true);
      }

      R.vy += lv().gravity;
      if (thrustUp) { R.vy -= 0.052; R.fuel -= 0.08; }
      if (left) { R.vx -= 0.03; R.fuel -= 0.025; R.facing = -1; }
      if (right) { R.vx += 0.03; R.fuel -= 0.025; R.facing = 1; }
      R.fuel = Math.max(0, R.fuel);
      R.vx *= 0.985;
      R.vy *= 0.985;
      if (!mutedRef.current && (thrustUp || left || right)) audio.thrust(true); else audio.thrust(false);

      if (R.landedPad && (thrustUp || left || right)) R.landedPad = null;
      if (R.landedPad) {
        if (R.landedPad.n === 0 && R.fuel < 100) { R.fuel = Math.min(100, R.fuel + 0.5); if (t % 14 === 0 && !mutedRef.current) audio.blip(700 + R.fuel * 4, 0.04); }
        handlePassenger();
        return;
      }

      R.x += R.vx; R.y += R.vy;

      if (R.x < 8) { R.x = 8; R.vx = Math.abs(R.vx) * 0.3; }
      if (R.x > W - 8) { R.x = W - 8; R.vx = -Math.abs(R.vx) * 0.3; }
      if (R.y < 5) { R.y = 5; R.vy = Math.max(0, R.vy); }

      const hb = { x: R.x - 8, y: R.y - 6, w: 16, h: 13 };
      for (const s of lv().solids) {
        if (hb.x < s.x + s.w && hb.x + hb.w > s.x && hb.y < s.y + s.h && hb.y + hb.h > s.y) {
          const fromTop = R.vy >= 0 && hb.y + hb.h - R.vy <= s.y + 3;
          const pad = lv().pads.find((p: any) => p.y === s.y && R.x >= p.x + (p.ox||0) && R.x <= p.x + (p.ox||0) + (p.ow || p.w) && s.x <= p.x && p.x + p.w <= s.x + s.w + 0.1);
          if (fromTop && pad && R.gear && Math.abs(R.vy) < 1.5 && Math.abs(R.vx) < 1.0) {
            R.y = s.y - 7; R.vy = 0; R.vx = 0; R.landedPad = pad;
            if (!mutedRef.current) audio.blip(220, 0.1);
            return;
          }
          explode(); return;
        }
      }
      handlePassenger();
    }

    function handlePassenger() {
      if (P.state === "waiting" && R.landedPad === P.pad) {
        P.state = "boarding"; P.t = 0;
      } else if (P.state === "boarding") {
        const dx = R.x - P.x;
        P.x += Math.sign(dx) * 0.6;
        if (Math.abs(dx) < 6) {
          P.state = "riding";
          if (!mutedRef.current) { audio.blip(523, 0.07); audio.blip(659, 0.07); audio.speak(`Chalo! Pad ${P.dest.n}!`); }
          say(`"CHALO!" — PAD ${P.dest.n}`, true);
        }
        if (!R.landedPad) { P.state = "waiting"; P.x = P.pad.x + (P.pad.ox||0) + (P.pad.ow||P.pad.w)/2; }
      } else if (P.state === "riding" && R.landedPad === P.dest) {
        P.state = "none";
        const tip = 10 + Math.floor(Math.random() * 15);
        G.rupees += 50 + tip;
        G.faresDone++;
        if (!mutedRef.current) { audio.blip(659, 0.08); audio.blip(784, 0.08); audio.blip(1047, 0.14); }
        if (G.faresDone >= lv().fares) {
          G.mode = G.level + 1 >= LEVELS.length ? "win" : "levelup";
        } else {
          say(`+${50 + tip} RUPEES! SHUKRIYA!`);
          newFare();
        }
      }
    }

    const px = (x: number, y: number, w: number, h: number, c: string) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };

    function text(s: string, x: number, y: number, c = C.white, center?: boolean) {
      ctx.fillStyle = c;
      ctx.font = "8px 'Courier New', monospace";
      ctx.textBaseline = "top";
      ctx.fontKerning = "none";
      if (center) x = x - s.length * 2.6;
      ctx.fillStyle = C.black; ctx.fillText(s, Math.round(x) + 1, Math.round(y) + 1);
      ctx.fillStyle = c; ctx.fillText(s, Math.round(x), Math.round(y));
    }

    function drawShaw(x: number, y: number, facing: number, gear: boolean) {
      x = Math.round(x); y = Math.round(y);
      px(x - 7, y - 6, 14, 3, C.black);
      px(x - 6, y - 7, 12, 1, C.black);
      px(x - 8, y - 3, 16, 6, C.yellow);
      px(x - 8, y - 4, 3, 1, C.yellow);
      px(x + 5, y - 4, 3, 1, C.yellow);
      px(facing > 0 ? x + 3 : x - 6, y - 4, 3, 3, C.cyan);
      px(facing > 0 ? x + 8 : x - 9, y - 1, 1, 2, C.white);
      px(x - 8, y + 1, 16, 1, C.green);
      if (gear) {
        px(facing > 0 ? x + 5 : x - 5, y + 3, 1, 2, C.dgrey);
        px(facing > 0 ? x - 6 : x + 5, y + 3, 1, 2, C.dgrey);
        px(facing > 0 ? x + 4 : x - 6, y + 4, 3, 3, C.black);
        px(facing > 0 ? x - 7 : x + 4, y + 4, 3, 3, C.black);
        px(facing > 0 ? x - 3 : x + 0, y + 4, 3, 3, C.black);
      } else {
        px(x - 7, y + 3, 14, 1, C.dgrey);
      }
      const k = keys.current;
      if (G.mode === "play" && R.fuel > 0) {
        if ((k.ArrowUp || k.w)) {
          const f = t % 4 < 2 ? C.orange : C.yellow;
          px(x - 5, y + 7, 3, 2 + (t % 3), f); px(x + 2, y + 7, 3, 2 + ((t + 1) % 3), f);
        }
        if (k.ArrowLeft || k.a) px(x + 9, y - 1, 2 + (t % 2), 2, C.cyan);
        if (k.ArrowRight || k.d) px(x - 11 + (t % 2), y - 1, 2 + (t % 2), 2, C.cyan);
      }
    }

    function drawPerson(x: number, y: number, c = C.ltred) {
      x = Math.round(x);
      px(x - 1, y - 8, 3, 3, C.brown);
      px(x - 2, y - 5, 5, 4, c);
      px(x - 2, y - 1, 2, 1, C.black); px(x + 1, y - 1, 2, 1, C.black);
      if (P.state === "waiting" && t % 30 < 15) px(x + 3, y - 9, 2, 3, c);
    }

    function drawLevel() {
      const L = lv();
      px(0, 0, W, H, L.sky);
      if (L.deco === "stars" || L.sky === C.black || L.sky === C.purple) {
        G.stars.forEach(([sx, sy]: number[], i: number) => { if ((t + i * 13) % 120 < 100) px(sx, sy, 1, 1, i % 3 ? C.ltgrey : C.white); });
      }
      if (L.deco === "sea") { for (let i = 0; i < 8; i++) px((i * 47 + t * 0.3) % W, 182 - (i % 3), 6, 1, C.white); px(0, 178, W, 10, L.sky === C.cyan ? C.blue : C.dgrey); }
      if (L.deco === "river") {
        px(0, 178, W, 10, C.blue);
        for (let i = 0; i < 6; i++) px((i * 61 + t * 0.2) % W, 180 + (i % 3) * 2, 8, 1, C.ltblue);
        for (let i = 0; i < 4; i++) px((i * 83 + t * 0.15) % W, 179, 2, 1, t % 20 < 10 ? C.yellow : C.orange);
      }
      px(280, 16, 8, 8, L.sky === C.cyan ? C.yellow : C.ltgrey);
      px(282, 14, 4, 2, L.sky === C.cyan ? C.yellow : C.ltgrey);
      px(282, 24, 4, 2, L.sky === C.cyan ? C.yellow : C.ltgrey);

      for (const s of L.solids) {
        px(s.x, s.y, s.w, s.h, s.c);
        if (s.win) {
          for (let wy = s.y + 4; wy < s.y + s.h - 4; wy += 7)
            for (let wx = s.x + 3; wx < s.x + s.w - 4; wx += 7)
              px(wx, wy, 3, 4, ((wx * 7 + wy * 13) % 5 < 2) ? C.yellow : C.black);
        }
      }
      for (const p of L.pads) {
        const pxx = p.x + ((p as any).ox || 0), pw = (p as any).ow || p.w;
        const isDest = P.state === "riding" && p === P.dest;
        const isPick = P.state === "waiting" && p === P.pad;
        const blink = (isDest || isPick) && t % 30 < 15;
        px(pxx, p.y - 1, pw, 2, blink ? C.white : (p.n === 0 ? C.green : L.accent));
        px(pxx, p.y - 2, 2, 1, blink ? C.red : C.ltred);
        px(pxx + pw - 2, p.y - 2, 2, 1, blink ? C.red : C.ltred);
        text(p.n === 0 ? "F" : String(p.n), pxx + pw / 2 - 2, p.y + 2, p.n === 0 ? C.ltgreen : C.white);
      }
    }

    function drawHUD() {
      px(0, 0, W, 11, C.black);
      text(`RS ${G.rupees}`, 4, 2, C.yellow);
      text(`FARE ${G.faresDone}/${lv().fares}`, 70, 2, C.ltblue);
      for (let i = 0; i < G.lives; i++) px(160 + i * 8, 3, 6, 5, C.yellow);
      text("GEAR", 186, 2, R.gear ? C.ltgreen : C.dgrey);
      text("GAS", 220, 2, C.ltgrey);
      px(244, 3, 52, 5, C.dgrey);
      px(244, 3, Math.round(R.fuel * 0.52), 5, R.fuel < 25 ? (t % 20 < 10 ? C.red : C.orange) : C.green);
      if (G.msgT > 0) {
        const y = 16;
        px(0, y - 2, W, 12, C.black);
        text(G.msg, W / 2, y, t % 40 < 20 ? C.white : C.yellow, true);
      }
      if (R.fuel <= 0 && G.mode === "play") text("OUT OF GAS! R = RESET", W / 2, 30, C.red, true);
    }

    function drawCenter(lines: [string, string][]) {
      px(20, 56, W - 40, 90, C.black);
      px(22, 58, W - 44, 86, C.blue);
      lines.forEach(([s, c], i) => text(s, W / 2, 68 + i * 12, c || C.white, true));
    }

    function render() {
      if (G.flash > 0) { px(0, 0, W, H, C.white); return; }
      drawLevel();
      if (P.state === "waiting" || P.state === "boarding") drawPerson(P.x, P.y);
      if (G.mode !== "dead" || parts.length === 0) drawShaw(R.x, R.y, R.facing, R.gear);
      parts.forEach((p) => px(p.x, p.y, 2, 2, p.c));
      drawHUD();

      if (G.mode === "title") {
        px(0, 0, W, H, C.blue);
        px(0, 0, W, 30, C.ltblue);
        text("**** COMMODORE 64 BASIC V2 ****", W / 2, 6, C.blue, true);
        text("64K RAM SYSTEM  38911 BYTES FREE", W / 2, 16, C.blue, true);
        text("READY.", 8, 34, C.ltblue);
        text("LOAD \"SPACE RICKSHAW\",8,1", 8, 44, C.ltblue);
        ctx.font = "bold 18px 'Courier New', monospace";
        ctx.fillStyle = C.yellow; ctx.fillText("SPACE", 105, 64);
        ctx.fillStyle = C.orange; ctx.fillText("RICKSHAW", 88, 84);
        drawShaw(160, 120 + Math.sin(t * 0.05) * 4, 1, t % 200 < 100);
        text("A BAJAJ ODYSSEY ACROSS INDIA", W / 2, 140, C.cyan, true);
        text("UP: THRUST    SPACE: LANDING GEAR", W / 2, 152, C.ltgrey, true);
        text("GEAR DOWN = NO STEERING. LAND SOFT!", W / 2, 162, C.ltgrey, true);
        text("R: CALL MECHANIC (COSTS A LIFE)", W / 2, 172, C.ltgrey, true);
        if (t % 50 < 30) text("PRESS SPACE OR TAP TO START", W / 2, 184, C.white, true);
      } else if (G.mode === "levelup") {
        drawCenter([
          ["LEVEL COMPLETE!", C.yellow],
          [`${lv().name}`, C.cyan],
          [`RUPEES: ${G.rupees}`, C.ltgreen],
          ["", C.white],
          ["SPACE: NEXT CITY", t % 40 < 20 ? C.white : C.ltgrey],
        ]);
      } else if (G.mode === "win") {
        drawCenter([
          ["ALL INDIA TOURED!", C.yellow],
          ["YOU ARE THE RICKSHAW RAJA", C.orange],
          [`FINAL: RS ${G.rupees}`, C.ltgreen],
          ["", C.white],
          ["SPACE: PLAY AGAIN", t % 40 < 20 ? C.white : C.ltgrey],
        ]);
      } else if (G.mode === "gameover") {
        drawCenter([
          ["GAME OVER YAAR", C.red],
          [`RUPEES EARNED: RS ${G.rupees}`, C.yellow],
          ["", C.white],
          ["SPACE: TRY AGAIN", t % 40 < 20 ? C.white : C.ltgrey],
        ]);
      }
    }

    function advance() {
      if (G.mode === "title") { G.lives = 3; G.rupees = 0; startLevel(0); }
      else if (G.mode === "levelup") startLevel(G.level + 1);
      else if (G.mode === "win" || G.mode === "gameover") { G.lives = 3; G.rupees = 0; G.mode = "title"; }
    }

    const toggleGear = () => {
      if (G.mode !== "play") return;
      if (R.landedPad) { R.gear = true; return; }
      R.gear = !R.gear;
      if (!mutedRef.current) audio.blip(R.gear ? 180 : 320, 0.09, "square", 0.08);
    };
    const mechanicReset = () => {
      if (G.mode !== "play") return;
      explode();
    };
    ctrl.current = { toggleGear, mechanicReset, advance };

    const down = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys.current[key] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
      if ((e.key === " " || e.key === "Enter") && G.mode !== "play") advance();
      if (!e.repeat && (e.key === " " || e.key === "ArrowDown" || key === "s" || key === "g")) toggleGear();
      if (!e.repeat && key === "r") mechanicReset();
    };
    const up = (e: KeyboardEvent) => { const key = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys.current[key] = false; };
    const tap = () => advance();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    canvas.addEventListener("pointerdown", tap);

    let raf: number;
    const loop = () => {
      update();
      ctx.save();
      ctx.scale(SCALE, SCALE);
      render();
      ctx.restore();
      ctx.fillStyle = "rgba(0,0,0,0.13)";
      for (let y = 0; y < H * SCALE; y += 3) ctx.fillRect(0, y, W * SCALE, 1);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      audio.thrust(false);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      canvas.removeEventListener("pointerdown", tap);
    };
  }, []);

  const press = (k: string, v: boolean) => (e: React.PointerEvent) => { e.preventDefault(); keys.current[k] = v; };
  const btnStyle: React.CSSProperties = {
    width: 64, height: 64, fontSize: 26, background: "#40318D", color: "#7869C4",
    border: "3px solid #7869C4", borderRadius: 8, userSelect: "none",
    touchAction: "none", fontFamily: "monospace", cursor: "pointer",
  };

  return (
    <div style={{ background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 8, fontFamily: "monospace" }}>
      <div style={{ border: "10px solid #40318D", borderRadius: 6, boxShadow: "0 0 40px #40318D88", lineHeight: 0, maxWidth: "100%" }}>
        <canvas ref={canvasRef} width={W * SCALE} height={H * SCALE} style={{ maxWidth: "100%", height: "auto", imageRendering: "pixelated", display: "block" }} />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <button style={btnStyle} onPointerDown={press("ArrowLeft", true)} onPointerUp={press("ArrowLeft", false)} onPointerLeave={press("ArrowLeft", false)}>◀</button>
        <button style={{ ...btnStyle, width: 84 }} onPointerDown={press("ArrowUp", true)} onPointerUp={press("ArrowUp", false)} onPointerLeave={press("ArrowUp", false)}>▲</button>
        <button style={btnStyle} onPointerDown={press("ArrowRight", true)} onPointerUp={press("ArrowRight", false)} onPointerLeave={press("ArrowRight", false)}>▶</button>
        <button style={{ ...btnStyle, width: 70, fontSize: 13, color: "#94E089", borderColor: "#94E089" }} onClick={() => ctrl.current.toggleGear && ctrl.current.toggleGear()}>GEAR</button>
        <button style={{ ...btnStyle, width: 70, fontSize: 13, color: "#B86962", borderColor: "#B86962" }} onClick={() => ctrl.current.mechanicReset && ctrl.current.mechanicReset()}>🔧 R</button>
        <button style={{ ...btnStyle, width: 64, fontSize: 12 }} onClick={() => setMuted((m) => !m)}>{muted ? "SND OFF" : "SND ON"}</button>
      </div>
      <div style={{ color: "#7869C4", fontSize: 12, marginTop: 8, textAlign: "center", maxWidth: 640 }}>
        ARROWS to fly (UP = thrust) · SPACE (or DOWN/G) toggles landing gear — gear down means no steering, so line up your descent first · gear must be down to land · F pad = petrol · R calls the mechanic (costs a life)
      </div>
    </div>
  );
}
