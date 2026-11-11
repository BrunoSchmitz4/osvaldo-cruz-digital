let contexto = null;

function pegarContexto() {
  const ContextoDeAudio = window.AudioContext || window.webkitAudioContext;
  if (!ContextoDeAudio) return null;

  if (!contexto) contexto = new ContextoDeAudio();
  if (contexto.state === "suspended") contexto.resume();

  return contexto;
}

function nota(audio, { frequencia, frequenciaFinal, inicio, duracao, volume, tipo }) {
  const oscilador = audio.createOscillator();
  const ganho = audio.createGain();
  const comeco = audio.currentTime + inicio;

  oscilador.type = tipo;
  oscilador.frequency.setValueAtTime(frequencia, comeco);
  if (frequenciaFinal) {
    oscilador.frequency.exponentialRampToValueAtTime(frequenciaFinal, comeco + duracao);
  }

  ganho.gain.setValueAtTime(0.0001, comeco);
  ganho.gain.exponentialRampToValueAtTime(volume, comeco + 0.012);
  ganho.gain.exponentialRampToValueAtTime(0.0001, comeco + duracao);

  oscilador.connect(ganho);
  ganho.connect(audio.destination);
  oscilador.start(comeco);
  oscilador.stop(comeco + duracao);
}

export function tocarAcerto() {
  const audio = pegarContexto();
  if (!audio) return;

  [523.25, 659.25, 783.99, 1046.5].forEach((frequencia, vez) => {
    const inicio = vez * 0.085;
    const duracao = vez === 3 ? 0.7 : 0.35;

    nota(audio, { frequencia, inicio, duracao, volume: 0.18, tipo: "sine" });
    nota(audio, { frequencia: frequencia * 4, inicio, duracao: 0.09, volume: 0.04, tipo: "sine" });
  });
}

export function tocarErro() {
  const audio = pegarContexto();
  if (!audio) return;

  [
    { frequencia: 233.08, frequenciaFinal: 207.65, inicio: 0 },
    { frequencia: 174.61, frequenciaFinal: 146.83, inicio: 0.17 },
  ].forEach((som) => {
    nota(audio, { ...som, duracao: 0.28, volume: 0.22, tipo: "triangle" });
  });
}
