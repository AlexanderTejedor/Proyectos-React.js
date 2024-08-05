/* export function App () {
    return (
        <div>
            <h1>Twitter Card</h1>
        </div>
    )
}; */
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

function App () {
    const format = (userName) => `@${userName}`;
    return (
        <section className='App'>
            <TwitterFollowCard
                formatUserName={format}
                userName='midudev' 
                name='Midudev'
            />
            <TwitterFollowCard 
                formatUserName={format}
                userName='Alexand59894016' 
                name='Alexander Tejedor'
            />
            <TwitterFollowCard 
                formatUserName={format}
                userName='frontendmentor' 
                name='Frontend Mentor'
            />
        </section>
    )
}

export { App };