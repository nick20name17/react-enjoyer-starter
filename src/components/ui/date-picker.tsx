import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { SelectSingleEventHandler } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
    date?: Date
    setDate: SelectSingleEventHandler
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='w-auto p-0'
                align='start'
            >
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
