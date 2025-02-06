import React, { useState } from 'react';
import ErrorBoundary from './utils/ErrorBoundary';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
  onModelChange: (model: Model) => void;
}

const ParamEditor: React.FC<Props> = ({ params, model, onModelChange }) => {
  const [paramValues, setParamValues] = useState<{ [key: number]: string }>(
    () => {
      return model.paramValues.reduce((acc, paramValue) => {
        acc[paramValue.paramId] = paramValue.value;
        return acc;
      }, {} as { [key: number]: string });
    }
  );

  const handleParamChange = (paramId: number, value: string) => {
    const updatedValues = {
      ...paramValues,
      [paramId]: value,
    };
    setParamValues(updatedValues);

    onModelChange({
      ...model,
      paramValues: Object.keys(updatedValues).map((id) => ({
        paramId: parseInt(id, 10),
        value: updatedValues[parseInt(id, 10)],
      })),
    });
  };

  return (
    <div>
      {params &&
        params.map((param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={paramValues[param.id] || ''}
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
    </div>
  );
};

export const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  const [model, setModel] = useState<Model>(initialModel);

  const handleModelChange = (updatedModel: Model) => {
    setModel(updatedModel);
  };

  const handleGetModel = () => {
    console.log('Model:', model);
  };

  return (
    <ErrorBoundary>
      <ParamEditor
        params={params}
        model={model}
        onModelChange={handleModelChange}
      />
      <button onClick={handleGetModel}>Get Model</button>
    </ErrorBoundary>
  );
};

export default App;
