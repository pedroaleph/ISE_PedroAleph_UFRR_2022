import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import PlugCard from 'core/components/PlugCard';
import { Plug, PlugData, PlugVariables } from 'core/types/Plug';
import { useState } from 'react';
import './styles.scss';
import { NumberFormatter, TimeFormatter } from "core/utils/formatters";
import ChartInputRadio from "core/components/ChartInputRadio";

import LedDataJson from 'core/types/led.json';
import AbajurDataJson from 'core/types/abajur.json';
import { Equation } from "core/utils/equation";

const Home = () => {
    const plugData: Plug[] = PlugData;

    const plug1: Plug = plugData[0];
    const plug2: Plug = plugData[1];

    const [checkPlug1, setCheckPlug1] = useState(false);
    const [checkPlug2, setCheckPlug2] = useState(false);

    const [name, setName] = useState(PlugVariables[0].name);
    const [tag, setTag] = useState(PlugVariables[0].tag);
    const [unit, setUnit] = useState(PlugVariables[0].unit);

    const ledData = LedDataJson.map(data => ({
        ...data, tempo_ms: TimeFormatter(data.tempo_ms)
    }));

    const abajurData = AbajurDataJson.map(data => ({
        ...data, tempo_ms: TimeFormatter(data.tempo_ms)
    }))

    const getVariable = (value: string) => {
        const variable = PlugVariables.filter(item => item.tag === value);

        setName(variable[0].name);
        setTag(variable[0].tag);
        setUnit(variable[0].unit);
    }

    const ToolTipFormatterHandler = (value: number, name: string) => (
        [`${NumberFormatter(value)} ${unit}`, `  ${name}`]

    );

    const ToolTipLabelFormatterHandler = (label: number) => {
        return 'tempo : ' + label + ' min';
    }

    return (
        <div className="home-container">
            <div className='card-base'>
                <div className='plugs-card'>
                    <h4>Tomadas: </h4>
                    <PlugCard
                        key={plug1.id}
                        name={plug1.name ?? `Tomada ${plug1.id}`}
                        onChangeName={name => {
                            plug1.name = name
                        }}
                        onCheck={() => setCheckPlug1(!checkPlug1)}
                    />
                    <PlugCard
                        key={plug2.id}
                        name={plug2.name ?? `Tomada ${plug2.id}`}
                        onChangeName={name => {
                            plug2.name = name
                        }}
                        onCheck={() => setCheckPlug2(!checkPlug2)}
                    />
                </div>
                <div className='plugs-chart'>
                    <ChartInputRadio selectedTag={value => getVariable(value)} />
                    <h4>Gráfico: </h4>
                    <ResponsiveContainer width={"100%"} height={"55%"}>
                        <LineChart
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey={"tempo_ms"}
                                name={name}
                                unit=" min"
                                domain={[0, 60]}
                                tickCount={5}
                            />
                            <YAxis
                                type="number"
                                dataKey={tag}
                                name={name}
                                unit={unit}
                            />
                            <Tooltip
                                formatter={ToolTipFormatterHandler}
                                labelFormatter={ToolTipLabelFormatterHandler}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                            {
                                checkPlug1 && <Line
                                    type="monotone"
                                    data={ledData}
                                    dataKey={tag}
                                    name={plug1.name}
                                    stroke="#b5d23b"
                                    strokeWidth={3}
                                />
                            }
                            {
                                checkPlug2 && <Line
                                    type="monotone"
                                    data={abajurData}
                                    dataKey={tag}
                                    name={plug2.name}
                                    stroke="#42A3A3"
                                    strokeWidth={3}
                                />
                            }
                        </LineChart>
                    </ResponsiveContainer>
                    <h4>Consumo de energia: </h4>
                    {
                        checkPlug1 && <p>
                            { `${plug1.name}: ` + Equation(LedDataJson) + ' kWh'}
                        </p>
                    }
                     {
                        checkPlug2 && <p>
                            { `${plug2.name}: ` + Equation(AbajurDataJson) + ' kWh'}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;