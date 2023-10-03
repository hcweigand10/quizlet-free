import React, {useState} from 'react'

const DeckTable = ({decks}) => {

  const headers = ["Deck", "Cards", "Actions"]

    return (
      <div className="relative overflow-x-auto">
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
          {decks.map(({ name, cardCount, _id }, index) => {
            const isLast = index === decks.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-slate-50";

            return (
              <tr key={_id}>
                <td className={classes}>
                  <h2 variant="small" color="slate" className="font-semibold text-sm sm:text-md">
                    {name}
                  </h2>
                </td>
                <td className={classes}>
                  <h2 variant="small" color="slate" className="font-normal text-slate-500 text-sm sm:text-md">
                    {cardCount}
                  </h2>
                </td>
                <td className={classes}>
                  <a
                    href={`/manage/${_id}`}
                    variant="small"
                    color="slate"
                    className="font-medium underline text-blue-400 text-sm sm:text-md"
                  >
                    Manage
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
}

export default DeckTable