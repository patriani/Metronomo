import React, {Component} from 'react';
import './Metronome.css'
import click1 from './click1.wav'
import click2 from './click2.wav'

// Reparar que a primeira aparição de uma constante na função ocorre a declaração "const"

class Metronome extends Component{

    constructor(props){
        super(props)

        this.state={ // inicialização
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4 // batidas por "medida"
        }
        this.click1 = new Audio(click1)
        this.click2 = new Audio(click2)
    }

    handleBpmChange = event => {
        const bpm = event.target.value // captura o atributo "value" do objeto e ouve o estado atual da variável
        
        if(this.state.playing){ // playing is true
            clearInterval(this.timer) // clear old set
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000) // set new fi based on actual value (interval relative value)
            
            this.setState({
                count: 0, // reset beat counter
                bpm // set the new bpm
            })
        }else{
            this.setState({bpm}) // otherwise just update the bpm -- initialize bpm but nothing is played
        }
    }

    startStop = () => {
        if(this.state.playing){
            // Para o timer
            clearInterval(this.timer)
            this.setState({
                playing: false
            })
        }else{
            // Inicia o timer com o BPM atualizado
            this.timer = setInterval(
                this.playClick,
                ( 60 / this.state.bpm ) * 1000 // *1000 pq está em milisegundos
            )
            this.setState(
            {
                count: 0,
                playing: true
                // Dispara um "click" imediatamente
            },
            this.playClick
            )
        }
    }

    playClick = () => {
        const { count, beatsPerMeasure} = this.state

        if (count % beatsPerMeasure === 0){ // Caso a contagem de BPM estiver no início
            this.click2.play()
        }else{
            this.click1.play()
        }

        // Observa qual beat estamos ouvindo, dentro do intervalo estipulado (%)
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        })) 
    }

    render(){
        const {playing,bpm} = this.state // referencia ao construtor
        
        //{playing ? 'Stop' : 'Start'} --> caso a variável esteja com o valor true o botão assume "Stop" como texto 
        // <div> {bpm} </div> printa o valor que a variável está assumindo
        return(
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div> 
                    <input 
                    type = "range" 
                    min="60" 
                    max="240" 
                    value={bpm} 
                    onChange={this.handleBpmChange}/>  {/* a barra "limita" o range de input (min e max) -- onChance == quando o marcador na barra for movido*/}        
                </div>                
                <button onClick={this.startStop}> 
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        )
    }
}

export default Metronome;