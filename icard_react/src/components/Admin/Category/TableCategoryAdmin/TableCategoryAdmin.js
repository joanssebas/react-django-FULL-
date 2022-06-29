import React from "react";
import {Table, Image, Button, Icon} from "semantic-ui-react";
import {map} from "lodash";
import "./TableCategoryAdmin.scss";

export function TableCategoryAdmin(props) {
  const {categories} = props;
  console.log("categories --> ", categories);
  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={category.image} />
            </Table.Cell>
            <Table.Cell>{category.title}</Table.Cell>

            <Actions category={category} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const {category} = props;

  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => console.log("actualizar categoria")}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => console.log("eliminar categoria")}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
