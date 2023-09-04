import React from 'react';
import { Word } from '@/components/feature/main/menu/Word';

type WordListProps = {
    items: string[];
};

export const WordList: React.FC<WordListProps> = ({ items }) => {
    return items.map((word, index) => {
        return <Word text={word} pos={index} key={word} />;
    });
};
