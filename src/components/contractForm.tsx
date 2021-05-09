import React from 'react';
import {
    Avatar,
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    InputLabel,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { useForm, Controller } from 'react-hook-form';
import { throttlingDropdownOptions, tokenDropdownOptions } from '../utils/constants';
import { CreateNewAlertContractRequestDTO } from '../model/models';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%'
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1)
        }
    },
    formControl: {
        margin: theme.spacing(2),
        width: '100%'
    },
    icon: {
        marginRight: theme.spacing(2)
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

interface Props {
    defaultData?: CreateNewAlertContractRequestDTO;
    onAddContractClick(data: CreateNewAlertContractRequestDTO): void;
}

const AddContractForm: React.FC<Props> = ({ defaultData, onAddContractClick }) => {
    const classes = useStyles();
    const { handleSubmit, control } = useForm();

    const onSubmit = (data: Omit<CreateNewAlertContractRequestDTO, 'targetType'>) => {
        console.log(data);
        onAddContractClick({ ...data, targetType: 'exact' });
    };

    return (
        <form
            className={classes.root}
            onSubmit={handleSubmit(onSubmit)}
            style={{ overflow: 'none' }}
            id="contract-form"
        >
            <Controller
                name="tokenId"
                control={control}
                defaultValue={defaultData?.tokenId}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl variant="filled" className={classes.formControl} error={!!error}>
                        <InputLabel id="tokenId-label">Token</InputLabel>
                        <Select
                            labelId="tokenId-label"
                            id="tokenId"
                            value={value}
                            onChange={onChange}
                            SelectDisplayProps={{
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            }}
                        >
                            {tokenDropdownOptions.map((token) => {
                                return (
                                    <MenuItem key={token.id} value={token.id}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={token.name}
                                                src={token.icon}
                                                className={classes.small}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={token.name} />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {error && <FormHelperText>{error.message}</FormHelperText>}
                    </FormControl>
                )}
                rules={{ required: 'Token required' }}
            />
            <Controller
                name="trend"
                control={control}
                defaultValue={defaultData?.trend ?? 'higher'}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl className={classes.formControl} component="fieldset">
                        <FormLabel component="legend">Trend</FormLabel>
                        <RadioGroup
                            aria-label="trend"
                            name="trend1"
                            value={value}
                            onChange={onChange}
                        >
                            <FormControlLabel
                                value="higher"
                                control={<Radio color="primary" />}
                                label={
                                    <Box component="span" display="flex">
                                        <TrendingUpIcon className={classes.icon} />
                                        Higher
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="lower"
                                control={<Radio color="primary" />}
                                label={
                                    <Box component="div" display="flex">
                                        <TrendingDownIcon className={classes.icon} />
                                        Lower
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </FormControl>
                )}
                rules={{ required: 'Target required' }}
            />
            <Controller
                name="priceTarget"
                control={control}
                defaultValue={defaultData?.priceTarget}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Target Price"
                        type="number"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                )}
                rules={{ required: 'Target Price required' }}
            />
            <Controller
                name="throttling"
                control={control}
                defaultValue={defaultData?.throttling}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl variant="filled" className={classes.formControl} error={!!error}>
                        <InputLabel id="throttling-label">Recurrence Interval</InputLabel>
                        <Select
                            labelId="throttling-label"
                            id="throttling"
                            value={value}
                            onChange={onChange}
                            SelectDisplayProps={{
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            }}
                        >
                            {throttlingDropdownOptions.map((option) => {
                                return (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {error && <FormHelperText>{error.message}</FormHelperText>}
                    </FormControl>
                )}
                rules={{ required: 'Recurrence Interval required' }}
            />
        </form>
    );
};
export default AddContractForm;
