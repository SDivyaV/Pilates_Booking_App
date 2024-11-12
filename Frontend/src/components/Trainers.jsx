import { useContext } from 'react';
import { AppContext } from "../context/AppContext";

const TrainerList = () => {
    const { trainers } = useContext(AppContext);

    if (!trainers || trainers.length === 0) {
        return <div>No trainers available</div>;
    }

    return (
        <div>
            <h1>Trainer List</h1>
            {trainers.map((trainer) => (
                <div key={trainer._id}>
                    <img src={trainer.image} alt={trainer.name} />
                    <h2>{trainer.name}</h2>
                    <p>{trainer.speciality}</p>
                    <p>{trainer.available ? 'Available' : 'Not Available'}</p>
                </div>
            ))}
        </div>
    );
};

export default TrainerList