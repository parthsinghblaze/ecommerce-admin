import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';

function CategoryConfirmDialog({ open, handleConfirmDialog, deleteCategoryItem }) {
  return (
    <Dialog
      open={open}
      onClose={handleConfirmDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}

    >
      <DialogTitle id="alert-dialog-title">Confirm the action?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Want to delete this Category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmDialog}>No</Button>
        <Button onClick={deleteCategoryItem}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategoryConfirmDialog;
