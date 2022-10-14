import React, {useState} from 'react';
import Body from '../../assets/components/Body';
import Card from '../../assets/components/Card';
import Header from '../../assets/components/Header';
import './style/style.css';

export default function TeamMaker({pokemonList}){
    return (
        <Body pokemonList={pokemonList}>
            <Header title="Team Maker"/>
            <div className='mainContent'>
                <div className='mainFrame'>
                </div>
            </div>
        </Body>
    )
}