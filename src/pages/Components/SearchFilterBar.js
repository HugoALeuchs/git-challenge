import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";

import searchRoute from "../../routes/SearchRoute";

import {
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";



function SearchFilterBar(props) {
  const [searchValueInput, setSearchValueInput] = useState();

  const [getSearchData, { loading, data }] = useLazyQuery(searchRoute);

  function handleChange(e) {
    setSearchValueInput(e.target.value);
  }
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if(data){
    // props.search(data);
    // props.search(searchValueInput);
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        onChange={handleChange}
        type="input"
        aria-label="Text input with dropdown button"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
              // getSearchData({ variables: { searchValue: searchValueInput+"user:HugoALeuchs" }});
              props.search(searchValueInput);
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
