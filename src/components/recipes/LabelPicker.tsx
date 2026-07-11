import React, { useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import type { RecipeLabel } from '../../types/recipe';
import { qualifiedLabelName } from '../../api/recipes';

/**
 * Enforce the Linear-style rule: at most one label per group. Given the
 * selection Autocomplete proposes (`next`) and the prior selection (`current`),
 * when a grouped label was just added, drop any previously-selected label from
 * the same group. Ungrouped labels (null group) never conflict.
 */
export function enforceOnePerGroup(
  current: RecipeLabel[],
  next: RecipeLabel[]
): RecipeLabel[] {
  const currentIds = new Set(current.map((l) => l.id));
  const added = next.filter((l) => !currentIds.has(l.id));
  if (added.length === 0) return next;
  const addedGroups = new Set(
    added.map((l) => l.group_id).filter((g): g is string => Boolean(g))
  );
  const addedIds = new Set(added.map((l) => l.id));
  return next.filter(
    (l) => addedIds.has(l.id) || !l.group_id || !addedGroups.has(l.group_id)
  );
}

interface CreateOption {
  inputValue: string;
  create: true;
}

type Option = RecipeLabel | CreateOption;

const filter = createFilterOptions<Option>();

export interface LabelPickerProps {
  labels: RecipeLabel[];
  /** Selected label ids. */
  value: string[];
  onChange: (ids: string[]) => void;
  /** When provided, offers a "+ New label" affordance for curated creation. */
  onCreateLabel?: ((name: string) => Promise<RecipeLabel>) | undefined;
  label?: string;
  placeholder?: string | undefined;
}

function isCreate(o: Option): o is CreateOption {
  return (o as CreateOption).create === true;
}

export function LabelPicker({
  labels,
  value,
  onChange,
  onCreateLabel,
  label = 'Labels',
  placeholder,
}: LabelPickerProps): React.ReactElement {
  const byId = React.useMemo(() => new Map(labels.map((l) => [l.id, l])), [labels]);
  const selected = value.map((id) => byId.get(id)).filter((l): l is RecipeLabel => Boolean(l));

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');

  async function commitCreate(): Promise<void> {
    if (!onCreateLabel || !createName.trim()) {
      setCreateOpen(false);
      return;
    }
    const created = await onCreateLabel(createName.trim());
    onChange([...value, created.id]);
    setCreateName('');
    setCreateOpen(false);
  }

  return (
    <>
      <Autocomplete
        multiple
        options={labels as Option[]}
        value={selected as Option[]}
        disableCloseOnSelect
        groupBy={(o) => (isCreate(o) ? '' : o.group_name || 'Other')}
        getOptionLabel={(o) => (isCreate(o) ? `Add "${o.inputValue}"` : qualifiedLabelName(o))}
        isOptionEqualToValue={(a, b) =>
          !isCreate(a) && !isCreate(b) && a.id === b.id
        }
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (onCreateLabel && params.inputValue.trim() !== '') {
            const exists = labels.some(
              (l) => l.name.toLowerCase() === params.inputValue.trim().toLowerCase()
            );
            if (!exists) {
              filtered.push({ inputValue: params.inputValue.trim(), create: true });
            }
          }
          return filtered;
        }}
        onChange={(_e, newValue) => {
          const createOpt = (newValue as Option[]).find(isCreate) as CreateOption | undefined;
          if (createOpt) {
            setCreateName(createOpt.inputValue);
            setCreateOpen(true);
            return;
          }
          const nextLabels = enforceOnePerGroup(selected, newValue as RecipeLabel[]);
          onChange(nextLabels.map((l) => l.id));
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const tagProps = getTagProps({ index });
            return (
              <Chip
                {...tagProps}
                key={isCreate(option) ? 'create' : option.id}
                label={isCreate(option) ? option.inputValue : qualifiedLabelName(option)}
                title={isCreate(option) ? option.inputValue : qualifiedLabelName(option)}
                size="small"
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...(params as unknown as React.ComponentProps<typeof TextField>)}
            label={label}
            {...(placeholder ? { placeholder } : {})}
          />
        )}
      />
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>New label</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Label name"
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void commitCreate();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button onClick={() => void commitCreate()} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
