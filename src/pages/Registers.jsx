import React, { useState } from 'react'

const Registers = () => {
    const [selectedType, setSelectedType] = useState('') // Estado para controlar o tipo selecionado

    // Função para lidar com a mudança do tipo selecionado
    const handleTypeChange = e => {
        const type = e.target.value
        setSelectedType(type)
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {/* Coluna 1 - Filtro */}
            <div className="col-span-1  p-6 m-2 rounded-xl shadow-md">
                <h2 className="p-2 mb-2 bg-zinc-900 w-fit text-zinc-100 rounded-md">
                    Filtrar por:
                </h2>
                <select
                    onChange={handleTypeChange}
                    value={selectedType}
                    className="border border-gray-300 rounded-md"
                >
                    <option value="clientes">Clientes</option>
                    <option value="produtos">Produtos</option>
                    <option value="servicos">Serviços</option>
                    {/* Adicione mais tipos conforme necessário */}
                </select>
                {/* Adicione elementos do filtro aqui */}
            </div>

            {/* Coluna 2 - Lista ou informação adicional */}
            <div className="col-span-2  border border-zinc-900 border-dashed p-6 m-2 rounded-lg">
                {selectedType && (
                    <div>
                        <h2>Informações sobre {selectedType}</h2>
                        {/* Adicione conteúdo adicional relacionado ao tipo selecionado */}
                    </div>
                )}
            </div>

            {/* Coluna 3 - Formulário */}
            <div className="col-span-3 bg-red-200 p-6 m-2">
                {selectedType && (
                    <div>
                        <h2>Formulário de Cadastro de {selectedType}</h2>
                        {/* Adicione o formulário de cadastro aqui */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Registers
