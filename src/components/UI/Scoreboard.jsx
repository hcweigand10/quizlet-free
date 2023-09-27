import React, {useState} from 'react'
import classCondition from '../../utils/classCondition';
import auth from '../../utils/auth';

const Scoreboard = ({deck}) => {

  const username = auth.isLoggedIn() ? auth.getProfile().data.username : null

  const scores = [...deck?.scores]
  .sort((a, b) => a.score - b.score)
  .slice(0, 5)
  .map((score, index) => {
    return (
      <li
      className={classCondition(
        index % 2 === 1 ? "bg-slate-50" : "",
        "px-6 py-4"
        )}
        key={index}
        >
          <div className="flex items-center">
            <span className="font-bold text-gray-900">{index + 1}</span>
            <div className="ml-3">
              <p className={classCondition(score.user.username === username ? "text-primary font-bold" : "text-gray-900", "text-lg italic")}>{score.user.username}</p>
              <p className="text-gray-500">Time: {score.score}</p>
            </div>
          </div>
        </li>
      );
    });
    return (
        <div className=''>
             <h2 className="text-xl mb-2">Highscores</h2>

               <div className="">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
             {scores.length > 0 ? (
              <div className="border-t border-gray-200">
                <ol className="divide-y divide-gray-200">{scores}</ol>
              </div>
                ) : <div className='p-6'><h2 className=''>No scores yet :(</h2></div>}
            </div>
          </div>
        </div>
    )
}

export default Scoreboard