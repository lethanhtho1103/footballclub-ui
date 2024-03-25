// SoccerFieldApp.js
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
    PLAYER: 'player',
};

const Player = ({ player }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.PLAYER, id: player.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                width: '50px',
                height: '50px',
                backgroundColor: 'blue',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '50px',
                color: 'white',
                position: 'absolute',
            }}
        >
            {player.name}
        </div>
    );
};

const Field = ({ position }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: () => ({ position }),
    });

    return (
        <div
            ref={drop}
            style={{
                width: '50px',
                height: '50px',
                border: '1px solid white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '50px',
                color: 'white',
                position: 'absolute',
                top: position.top,
                left: position.left,
            }}
        >
            {position.name}
        </div>
    );
};

const SoccerFieldApp = () => {
    const players = [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
        // Thêm nhiều cầu thủ khác nếu cần
    ];

    const fieldPositions = [
        { id: 1, name: 'Goalkeeper', top: '50%', left: '5%' },
        { id: 2, name: 'Defender', top: '25%', left: '20%' },
        { id: 3, name: 'Defender', top: '75%', left: '20%' },
        { id: 4, name: 'Midfielder', top: '50%', left: '40%' },
        { id: 5, name: 'Midfielder', top: '25%', left: '60%' },
        { id: 6, name: 'Midfielder', top: '75%', left: '60%' },
        { id: 7, name: 'Forward', top: '25%', left: '90%' },
        { id: 8, name: 'Forward', top: '75%', left: '90%' },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ position: 'relative', width: '800px', height: '400px', background: 'green' }}>
                {fieldPositions.map((position) => (
                    <Field key={position.id} position={position} />
                ))}
                {players.map((player) => (
                    <Player key={player.id} player={player} />
                ))}
            </div>
        </DndProvider>
    );
};

export default SoccerFieldApp;
