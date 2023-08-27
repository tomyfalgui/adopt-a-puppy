export type PuppyProps = {
    name: string;
    photoUrl: string;
    breed: string;
}
export default function PuppyDisplay({name, photoUrl, breed}: PuppyProps) {
    return (<li>
        <img src={photoUrl} alt={`An image of puppy breed ${breed}`}/>
        <p>{name}</p>
    </li>)

}