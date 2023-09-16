import { Card, Button } from "flowbite-react"
import { Link } from "react-router-dom"

const DeckPreview = ({name, description, user, cardCount, id}) => {
  return (
    <Card className="max-w-sm" >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
      </p>
      <Link to={`/play/${id}`}>
          Play Now!
      </Link>
    </Card>
  )
}

export default DeckPreview