import Character from './Character.jsx'

const Initial = (props) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                props.data.map((character) => (
                    <Character key={character.id} data={character}/>
                ))
            }
        </div>
    );
};

export default Initial;