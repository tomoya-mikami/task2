export default function Getrandom(start: number, end: number){
    let random : number = Math.floor(Math.random() * (start + 1 - end)) + end;

    return random;
}