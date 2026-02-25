"use client";

import { useState, useEffect } from "react";

const facts = [
  "Loves Chick-fil-A (specifically the nuggets)",
  "Second grade student at Ashbrook",
  "Has a German Shepherd named Lobo",
  "Born April 2, 2018",
  "Future football star ⭐️",
  "Best friends with his brothers",
  "Loves riding his bike",
  "Favorite color is blue",
];

const hobbies = [
  { name: "Football", emoji: "🏈", color: "bg-orange-600" },
  { name: "Gaming", emoji: "🎮", color: "bg-purple-500" },
  { name: "Biking", emoji: "🚴", color: "bg-green-500" },
  { name: "Reading", emoji: "📚", color: "bg-blue-500" },
];

const photos = [
  { id: 1, alt: "Colton at Chick-fil-A", emoji: "🍔" },
  { id: 2, alt: "Football game", emoji: "🏈" },
  { id: 3, alt: "With brothers", emoji: "👦" },
  { id: 4, alt: "Smiling", emoji: "😄" },
];

export default function ColtonPage() {
  const [showFact, setShowFact] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [partyEmojis, setPartyEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [highFives, setHighFives] = useState(0);
  const [showHighFiveMsg, setShowHighFiveMsg] = useState(false);
  const [guessAge, setGuessAge] = useState<number | null>(null);
  const [guessResult, setGuessResult] = useState<"too low" | "too high" | "correct" | null>(null);
  const [dancing, setDancing] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const triggerParty = () => {
    setPartyMode(true);
    const emojis = ["🎉", "🎊", "⭐️", "🔥", "💥", "👏", "🎈", "🏈", "🍔"];
    const newEmojis = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
    }));
    setPartyEmojis(newEmojis);
    setTimeout(() => setPartyMode(false), 3000);
  };

  const doHighFive = () => {
    setHighFives((prev) => prev + 1);
    setShowHighFiveMsg(true);
    setTimeout(() => setShowHighFiveMsg(false), 1500);
  };

  const checkGuess = (age: number) => {
    setGuessAge(age);
    if (age === 7) {
      setGuessResult("correct");
    } else if (age < 7) {
      setGuessResult("too low");
    } else {
      setGuessResult("too high");
    }
  };

  return (
    <main className={`min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 p-4 sm:p-8 ${dancing ? "animate-pulse" : ""}`}>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Hero */}
        <section className={`text-center transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="mb-6 inline-block overflow-hidden rounded-full border-4 border-white shadow-2xl">
            <img src="/colton.jpg" alt="Colton Wong" className="h-48 w-48 object-cover sm:h-64 sm:w-64" />
          </div>
          <h1 className="text-5xl font-bold text-white drop-shadow-lg sm:text-7xl">
            Colton Wong
          </h1>
          <p className="mt-4 text-xl font-medium text-white/90">
            Second Grade • Ashbrook School • Age 7
          </p>
          <p className="mt-2 text-lg text-white/70">Corvallis, Oregon</p>
        </section>

        {/* Interactive Buttons */}
        <section className="flex flex-wrap justify-center gap-4">
          <button
            onClick={triggerParty}
            className="rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
          >
            🎉 PARTY MODE!
          </button>
          <button
            onClick={doHighFive}
            className="rounded-full bg-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
          >
            👋 High Five!
          </button>
          <button
            onClick={() => setDancing(!dancing)}
            className="rounded-full bg-purple-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
          >
            💃 Dance Party!
          </button>
        </section>

        {/* Party Effects */}
        {partyMode && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {partyEmojis.map((item) => (
              <span
                key={item.id}
                className="absolute animate-bounce text-6xl"
                style={{ left: `${item.x}%`, top: `${Math.random() * 50}%`, animationDuration: `${0.5 + Math.random()}s` }}
              >
                {item.emoji}
              </span>
            ))}
          </div>
        )}

        {/* High Five Counter */}
        {showHighFiveMsg && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="animate-bounce rounded-3xl bg-yellow-400 p-8 text-6xl shadow-2xl">👋</div>
          </div>
        )}
        <div className="rounded-2xl bg-blue-500 p-4 text-center">
          <p className="font-bold text-white">👋 High Fives: <span className="text-3xl">{highFives}</span></p>
        </div>

        {/* Age Guessing Game */}
        <section className="rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">🎮 Guess Colton's Age!</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[5, 6, 7, 8, 9].map((age) => (
              <button
                key={age}
                onClick={() => checkGuess(age)}
                className={`rounded-full px-6 py-3 font-bold shadow-lg transition-transform hover:scale-110 ${
                  guessAge === age
                    ? guessResult === "correct"
                      ? "bg-green-500 text-white"
                      : guessResult === "too low"
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
          {guessResult && (
            <p className="mt-4 text-center text-xl font-bold">
              {guessResult === "correct" && "🎉 RIGHT! He's 7!"}
              {guessResult === "too low" && "📈 Higher! Try again!"}
              {guessResult === "too high" && "📉 Lower! Try again!"}
            </p>
          )}
        </section>

        {/* Age Counter - hidden until guessed correctly */}
        {guessResult === "correct" && (
          <section className="rounded-3xl bg-white/20 backdrop-blur-md p-6 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-white/70">Age</p>
            <p className="mt-2 text-6xl font-bold text-white">7</p>
            <p className="mt-2 text-white/80">Born April 2, 2018</p>
          </section>
        )}

        {/* Random Fact */}
        <section className="rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">🎲 Random Fact About Colton</h2>
          <div className="text-center">
            <p className="min-h-[80px] text-xl font-medium text-purple-700">
              {facts[showFact]}
            </p>
            <button
              onClick={() => setShowFact((prev) => (prev + 1) % facts.length)}
              className="mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Next Fact →
            </button>
          </div>
        </section>

        {/* Tap to Make It Rain */}
        <section className="rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 p-8 text-center shadow-2xl">
          <h2 className="mb-4 text-2xl font-bold text-white">👆 Tap to Make It Rain!</h2>
          <button
            onClick={triggerParty}
            className="rounded-full bg-white px-8 py-4 text-2xl font-bold text-blue-500 shadow-xl transition-transform hover:scale-110 active:scale-95"
          >
            TAP HERE! 👇
          </button>
        </section>

        {/* Hobbies */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white drop-shadow">🏆 Things Colton Loves</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {hobbies.map((hobby, i) => (
              <div
                key={hobby.name}
                className={`${hobby.color} rounded-2xl p-6 text-center shadow-lg transition-transform hover:scale-105`}
              >
                <span className="text-4xl">{hobby.emoji}</span>
                <p className="mt-2 font-bold text-white">{hobby.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">📸 Photo Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${i % 2 === 0 ? "from-pink-300 to-orange-200" : "from-blue-300 to-purple-200"} flex items-center justify-center`}
              >
                <span className="text-6xl">{photo.emoji}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Family */}
        <section className="rounded-3xl bg-white/20 backdrop-blur-md p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">👨‍👩‍👦‍👦 Family</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <span className="text-4xl">👨</span>
              <p className="font-medium text-white">Dad (Noah)</p>
            </div>
            <div className="text-center">
              <span className="text-4xl">👩</span>
              <p className="font-medium text-white">Mom (Lilian)</p>
            </div>
            <div className="text-center">
              <span className="text-4xl">👶</span>
              <p className="font-medium text-white">Bennett (brother)</p>
            </div>
            <div className="text-center">
              <span className="text-4xl">👶</span>
              <p className="font-medium text-white">Rudy (brother)</p>
            </div>
          </div>
        </section>

        {/* Pets */}
        <section className="rounded-3xl bg-amber-100 p-8 shadow-xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-amber-900">🐕 Pets</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <span className="text-5xl">🐑</span>
              <p className="mt-2 font-bold text-amber-800">Migo</p>
              <p className="text-sm text-amber-600">Great Pyrenees (big white fluffy)</p>
            </div>
            <div className="text-center">
              <span className="text-5xl">🐕‍🦺</span>
              <p className="mt-2 font-bold text-amber-800">Lobo</p>
              <p className="text-sm text-amber-600">Black German Shepherd</p>
            </div>
          </div>
        </section>

        {/* Chickens */}
        <section className="rounded-3xl bg-yellow-100 p-8 shadow-xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-yellow-900">🐔 Our Chickens (5!)</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="text-center rounded-xl bg-yellow-200 p-4">
              <span className="text-4xl">🐔</span>
              <p className="mt-2 font-bold text-yellow-800">Tea</p>
              <p className="text-xs text-yellow-700">Colton's chicken!</p>
            </div>
            <div className="text-center rounded-xl bg-yellow-200 p-4">
              <span className="text-4xl">🐔</span>
              <p className="mt-2 font-bold text-yellow-800">Sprite</p>
            </div>
            <div className="text-center rounded-xl bg-yellow-200 p-4">
              <span className="text-4xl">🐔</span>
              <p className="mt-2 font-bold text-yellow-800">Starry</p>
            </div>
            <div className="text-center rounded-xl bg-yellow-200 p-4">
              <span className="text-4xl">🐔</span>
              <p className="mt-2 font-bold text-yellow-800">Cici</p>
            </div>
            <div className="text-center rounded-xl bg-yellow-200 p-4">
              <span className="text-4xl">🐔</span>
              <p className="mt-2 font-bold text-yellow-800">Wawa</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-gray-200 p-4 text-center">
            <p className="text-lg font-bold text-gray-700">💛 In Loving Memory</p>
            <p className="text-gray-600">Boba 🐔 <span className="text-sm">(2020-2026, we miss you!)</span></p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-white/50">
          <p>Made with ❤️ for Colton</p>
          <p className="mt-1 text-sm">© 2026 Wong Family</p>
        </footer>
      </div>
    </main>
  );
}
