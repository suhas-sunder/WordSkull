import { Link } from "@remix-run/react";

export default function ClassicIndex() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome to Classic</h2>
      <p className="text-gray-600">
        Pick a classic mode to play. Each game has simple rules and fast rounds.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="word-scramble" className="rounded-lg border p-4 hover:shadow">
          <h3 className="font-semibold">Word Scramble</h3>
          <p className="text-sm text-gray-600">
            Unscramble letters to form words.
          </p>
        </Link>

        <Link to="letter-rush" className="rounded-lg border p-4 hover:shadow">
          <h3 className="font-semibold">Letter Rush</h3>
          <p className="text-sm text-gray-600">
            Make as many words as you can before time runs out.
          </p>
        </Link>
      </div>
    </section>
  );
}
