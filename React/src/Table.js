import React from "react";
import styled from "styled-components";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import scrollbarWidth from "./scrollbarWidth";

const Styles = styled.div`
	padding: 1rem;
	.table {
		display: inline-block;
		border-spacing: 0;
		border: 1px solid black;
		font-size: small;

		.th,
		.td {
			margin: 0;
			padding: 0.5rem;
			border-right: 1px solid black;

			:last-child {
				border-right: 1px solid black;
			}
            img {
                border-radius: 50%;
            }
		}
	}
`;

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI

	const defaultColumn = React.useMemo(
		() => ({
			width: 150,
		}),
		[]
	);

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		totalColumnsWidth,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useBlockLayout
	);

	const RenderRow = React.useCallback(
		({ index, style }) => {
			const row = rows[index];
			prepareRow(row);
			return (
				<div
					{...row.getRowProps({
						style,
					})}
					className="tr"
				>
					{row.cells.map((cell) => {
						return (
							<div {...cell.getCellProps()} className="td">
								{cell.render("Cell")}
							</div>
						);
					})}
				</div>
			);
		},
		[prepareRow, rows]
	);

	// Render the UI for your table
	return (
		<div {...getTableProps()} className="table">
			<div>
				{headerGroups.map((headerGroup) => (
					<div {...headerGroup.getHeaderGroupProps()} className="tr">
						{headerGroup.headers.map((column) => (
							<div {...column.getHeaderProps()} className="th">
								{column.render("Header")}
							</div>
						))}
					</div>
				))}
			</div>

			<div {...getTableBodyProps()}>
				<FixedSizeList
					height={600}
					itemCount={rows.length}
					itemSize={50}
					width={totalColumnsWidth + scrollBarSize}
				>
					{RenderRow}
				</FixedSizeList>
			</div>
		</div>
	);
}

function PeopleTable(props) {
	const columns = React.useMemo(
		() => [
			{
				Header: "Row Index",
				accessor: (row, i) => i,
				width: 200,
			},
			{
				Header: "Image",
				accessor: "image_url",
				Cell: ({ cell: { value } }) => (
					<img src={value}/>
				),
                width: 200
			},
			{
				Header: "First Name",
				accessor: "first_name",
				width: 200,
			},
			{
				Header: "Last Name",
				accessor: "last_name",
				width: 200,
			},
			{
				Header: "Age",
				accessor: "age",
				width: 200,
			},
		],
		[]
	);

	return (
		<Styles>
			<Table columns={columns} data={props.data} />
		</Styles>
	);
}

export default PeopleTable;
