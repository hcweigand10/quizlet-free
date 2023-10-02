import React, { useState } from "react";
import { secondsToTime } from "../../utils/helpers";

const ScoreReports = ({ scoreReports, username }) => {

  const headers = ["Deck", "Time", "Rank", "Action"];

  const ranks = scoreReports.map((deck) => {
    const ranked = [...deck.scores].sort((a, b) => a.score - b.score);
    const rank = ranked.findIndex((e) => e.user.username === username) + 1;
    return { deck: deck.name, total: deck.scores.length, rank, score: deck.scores[rank-1].score, _id: deck._id };
  });



  return (
    <div className="">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="border-b border-slate-100 bg-slate-50 p-4"
              >
                <h2
                  variant="small"
                  color="slate"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </h2>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ranks.map(({ deck, total, rank, score, _id }, index) => {
            const isLast = index === ranks.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-slate-50";

            return (
              <tr key={_id}>
                <td className={classes}>
                  <h2 variant="small" color="slate" className="font-bold">
                    {deck}
                  </h2>
                </td>
                <td className={classes}>
                  <h2 variant="small" color="slate" className="font-bold">
                    {secondsToTime(score)}
                  </h2>
                </td>
                <td className={classes}>
                  <h2 variant="small" color="slate" className="font-normal text-slate-500">
                    <span className="font-bold text-slate-700">{rank}</span> out of <span className="font-bold text-slate-700">{total}</span>
                  </h2>
                </td>
                <td className={classes}>
                  <a
                    href={`/view/${_id}`}
                    variant="small"
                    color="slate"
                    className="font-medium underline text-blue-400"
                  >
                    Play again
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreReports;
