
import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const HeaderRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
	width: 100%;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
		gap: 0.75rem;
	}
`;

export const SearchInput = styled.input`
	padding: 10px 12px;
	border-radius: 8px;
	border: 1px solid #e6e9ef;
	min-width: 240px;
	max-width: 420px;
	box-sizing: border-box;
	transition: box-shadow 0.15s ease, border-color 0.15s ease;

	&:focus {
		outline: none;
		box-shadow: 0 4px 12px rgba(2, 6, 23, 0.08);
		border-color: #f7b32b;
	}
`;

export const TableContainer = styled.div`
	background: white;
	border-radius: 10px;
	padding: 12px;
	box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
	overflow-x: auto;
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	min-width: 640px;
`;

export const Th = styled.th`
	text-align: left;
	padding: 12px 16px;
	color: #6b7280;
	font-size: 0.85rem;
	font-weight: 600;
	border-bottom: 1px solid #eef2f6;
`;

export const Td = styled.td`
	padding: 12px 16px;
	vertical-align: middle;
	font-size: 0.95rem;
	color: #111827;
	border-bottom: 1px solid #f3f4f6;
`;

export const StatusButton = styled.button`
	padding: 6px 10px;
	border-radius: 999px;
	border: none;
	cursor: pointer;
	font-weight: 600;
	font-size: 0.85rem;
	transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
	display: inline-flex;
	align-items: center;
	gap: 8px;

	background: ${props => props.status === 'En attente' ? '#f3f4f6' : props.status === 'Approuvé' ? '#ecfdf5' : '#fff1f2'};
	color: ${props => props.status === 'En attente' ? '#374151' : props.status === 'Approuvé' ? '#065f46' : '#7f1d1d'};
	box-shadow: ${props => props.status === 'En attente' ? 'none' : '0 6px 18px rgba(2,6,23,0.04)'};

	&:hover {
		transform: translateY(-2px);
	}
`;

export const ActionGroup = styled.div`
	display: flex;
	gap: 8px;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #6b7280;
`;
