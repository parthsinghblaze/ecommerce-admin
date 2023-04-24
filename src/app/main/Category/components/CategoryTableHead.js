import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';

const rows = [
  {
    id: 'image',
    align: 'left',
    disablePadding: false,
    label: 'Image',
    sort: true,
    width: 60,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
    sort: true,
    width: 300,

  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Category Type',
    sort: true,
    width: 200,

  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Action',
    sort: true,
    width: 400,
  },
];

function CategoryTableHead(props) {

  return (
    <TableHead >
      <TableRow className="h-48 sm:h-64 sticky left-0 w-[100%] top-0 left-0">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              width={row.width}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel className="font-semibold">{row.label}</TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default CategoryTableHead;
