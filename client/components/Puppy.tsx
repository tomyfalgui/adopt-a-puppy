export type PuppyProps = {
  name: string
  photoUrl: string
  breed: string
}
export default function PuppyDisplay({ name, photoUrl, breed }: PuppyProps) {
  return (
    <li className="mr-8 flex flex-col items-center">
      <img
        src={photoUrl}
        alt={`An image of puppy breed ${breed}`}
        className="object-cover w-40 h-40 rounded-full"
      />
      <p className="text-2xl">{name}</p>
    </li>
  )
}
