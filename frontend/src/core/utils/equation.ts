import { PlugContent } from "core/types/Plug";
import { NumberFormatter } from "./formatters";

export const Equation = (data: PlugContent[]) => {
    // numero total de dados
    //const N = data.length;
    // intevalo da amostragem fixo
    //const deltaT = Math.abs(data[0].tempo_ms - data[1].tempo_ms);
    const deltaT = 0.008333333333333333; // 5 minutos na escala até 1
    // energia gerada
    const potencias = data.map(item => (  item.corrente_mA * item.tensao_V ));

    const deltaE = deltaT * getSum(potencias);

    return NumberFormatter(deltaE);

    //console.log(N, TimeFormatter(deltaT), deltaE);
}

const getSum = (numbers: number[]) => {
    return numbers.reduce(
        (previousValue: number, currentValue: number) => previousValue + currentValue
        , 0);
}