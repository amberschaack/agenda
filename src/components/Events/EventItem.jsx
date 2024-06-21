import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function EventItem({ event }) {

    return (
        <>
            <Card sx={{ width: 250, height: 150 }} id='card'>
                <div>
                    <Typography level="title-lg">{event.event_name}</Typography>
                    <Typography level="body-sm">{event.event_date}</Typography>
                </div>
            </Card>
        </>
    )
}


// onClick={() => eventDetails(event.event_id)}>{event.event_name}