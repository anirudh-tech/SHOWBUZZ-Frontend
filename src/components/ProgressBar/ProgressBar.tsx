
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const ProgressBar = (props: any & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <div className='w-full'>
        <LinearProgress sx={{width: '500px'}} variant="determinate" value={props.value} />
        </div>
      </Box>
        <Typography sx={{width: '100%'}} variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      
    </Box>
  )
}

export default ProgressBar