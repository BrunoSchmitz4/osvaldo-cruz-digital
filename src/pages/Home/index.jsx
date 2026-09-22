
// export default - permite que a função/variável 
// seja chamável em outro lugar;

// function AlgumaCoisa() {} - Função que permite construírmos
// uma página, um componente, ou uma funcionalidade;
export default function Home() {
    return (
        <section>
            <header>
                <h1>Osvaldo Cruz Digital</h1>
            </header>
            <nav>
                <p>Sala de Informática</p>
                <p>Refeitório</p>
                <p>Pátio </p>                
                <p>Quadra</p>
                <p>Sala dos Professores</p>
                <p>Biblioteca</p>
                <p>Sala de Orientação de Convivência</p>
                <p>Cozinha dos Funcionários</p>
                <p>Secretaria</p>
                <p>Anfiteatro</p>
                <p>Sala de Aula</p>
                <p>Laboratório de Ciências</p>
                <p>Diretoria</p>
                <p>Grêmil Estudantil</p>
            </nav>            
        </section>
    )
}