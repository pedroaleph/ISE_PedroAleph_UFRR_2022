export type Plug  = {
    id: number,
    name?: string
}

export type PlugContent = {
    tomada_id: number,
    corrente_mA: number,
    tensao_V: number,
    tempo_ms: number
}

export type PlugVariableType = {
    id: number
    name: string
    tag: string
    meansure: string
    unit: string
}

export const PlugData: Plug[] = [
    {
        id: 1,
        name: 'Led'
    },
    {
        id: 2,
        name: 'Abajur'
    }
]

export const PlugVariables: PlugVariableType[] = [
    {
        id: 1,
        name: 'corrente',
        tag: 'corrente_mA',
        meansure: 'miliamperes',
        unit :' mA'
    },
    {
        id: 2,
        name: 'tensão',
        tag: 'tensao_V',
        meansure: 'volts',
        unit :' V'
    }
]