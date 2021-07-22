import React, { useState } from "react";

import {
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";


function SearchFilterBar(props) {
  const [searchValue, setSearchValeu] = useState();

  function handleChange(e) {
    setSearchValeu(e.target.value);
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        onChange={handleChange}
        type="input"
        aria-label="Text input with dropdown button"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            
          }
        }}
      />

      <DropdownButton
        variant="outline-secondary"
        title="Filtro"
        id="input-group-dropdown-2"
        align="end"
      >
        <Dropdown.Item onClick={() => props.filter("Todos")} href="#">
          Todos
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.filter("Fork")} href="#">
          Fork
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.filter("Arquivado")} href="#">
          Arquivado
        </Dropdown.Item>
      </DropdownButton>

      <DropdownButton
        variant="outline-secondary"
        title="Ordenar"
        id="input-group-dropdown-2"
        align="end"
      >
        <Dropdown.Item onClick={() => props.sort("Último atualizado")} href="#">
          Último atualizado
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.sort("Nome")} href="#">
          Nome
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.sort("Estrelas")} href="#">
          Estrelas
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
}

export default SearchFilterBar;
