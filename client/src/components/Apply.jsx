import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import supabase from "@/data/supabase";
import RegisterButton from '@/components/RegisterButton';

export default function Apply() {
    const router = useRouter();
    const [questions, setQuestions] = useState(['']);
    const [showQuestions, setShowQuestions] = useState(false);

    const handleApply = async () => {
        // Insert questions into the stats table
        const { error } = await supabase
            .schema('placements')
            .from('stat')
            .insert(questions.map(question => ({
                role_id: router.query.roleId,
                drive_id: router.query.driveId,
                question: question
            })));

        if (error) {
            console.error('Error inserting questions:', error.message);
            return;
        }

        // Redirect or show success message
    };

    const addQuestion = () => {
        if (questions.length < 4) {
            setQuestions(prevQuestions => [...prevQuestions, '']);
        }
    };

    const removeQuestion = index => {
        setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
    };

    return (
        <div>
            <button type='button' onClick={() => setShowQuestions(prev => !prev)}>Apply</button>
            {showQuestions && (
                <div>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={question}
                                onChange={e => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index] = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                            />
                            <button onClick={() => removeQuestion(index)}>-</button>
                        </div>
                    ))}
                    <button onClick={addQuestion}>+</button>
                </div>
            )}
            <RegisterButton onClick={handleApply} />
        </div>
    );
}
