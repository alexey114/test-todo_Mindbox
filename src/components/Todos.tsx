import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import TodoItems from './TodoItems'

export interface IItemsTodo {
	id: number
	name: string
	completed: boolean
}

const ITEMS_DEFAULT = [
	{
		id: 1,
		name: 'вынести мусор',
		completed: true,
	},
	{
		id: 2,
		name: 'сделать ракету',
		completed: false,
	},
	{
		id: 3,
		name: 'слетать в космос',
		completed: false,
	},
]

export default function Todos() {
	const [inputValue, setInputValue] = useState<string>('')
	const [items, setItems] = useState<IItemsTodo[]>(ITEMS_DEFAULT)
	const [currentItems, setCurrentItems] = useState<IItemsTodo[]>(ITEMS_DEFAULT)
	const [isAllTasks, setIsAllTasks] = useState(true)

	function addItem() {
		if (inputValue === '') {
			toast.error('Введите задачу!')
			return
		}
		const newItems = [
			...items,
			{
				id: items[items.length - 1]?.id + 1 || 0,
				name: inputValue,
				completed: false,
			},
		]
		setItems(newItems)
		toast.success('Задача добавлена!')
		updateCurrentItems(newItems, isAllTasks ? null : false)
	}

	const check = (id: number) => {
		const newItems = items.map(item => {
			if (item.id === id) {
				return { ...item, completed: !item.completed }
			}
			return item
		})
		setItems(newItems)
		updateCurrentItems(newItems, isAllTasks ? null : currentItems[0]?.completed)
	}

	const deleteItem = (id: number) => {
		const newItems = items.filter(item => item.id !== id)
		setItems(newItems)
		updateCurrentItems(newItems, isAllTasks ? null : false)
		toast.success('Задача удалена!')
	}

	function updateCurrentItems(newItems: IItemsTodo[], filter: boolean | null) {
		if (filter === null) {
			setCurrentItems(newItems)
		} else {
			setCurrentItems(newItems.filter(item => item.completed === filter))
		}
	}

	function isFilterCompletedTasks(arg: boolean, argAll: boolean) {
		setIsAllTasks(argAll)
		updateCurrentItems(items, argAll ? null : arg)
	}

	const outstanding = () => {
		return items.reduce((acc, item) => (item.completed ? acc : acc + 1), 0)
	}

	function deleteCompletedTasks() {
		const newItems = items.filter(item => !item.completed)
		setItems(newItems)
		updateCurrentItems(newItems, isAllTasks ? null : false)
		toast.success('Выполненные задачи удалены!')
	}

	useEffect(() => {
		updateCurrentItems(items, isAllTasks ? null : currentItems[0]?.completed)
	}, [items])

	return (
		<div
			style={{
				border: '1px solid #000',
				borderRadius: 20,
				padding: 30,
				backgroundColor: '#fff',
				boxShadow: '10px 5px 5px black',
			}}
		>
			<Toaster position='top-center' reverseOrder={true} />
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
				<TextField
					variant='outlined'
					label='Введите новую задачу!'
					type='text'
					onChange={event => setInputValue(event.target.value)}
					value={inputValue}
					style={{ width: '100%' }}
				/>
				<button onClick={addItem} aria-label='add'>
					<AddTaskSharpIcon />
				</button>
			</div>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 20,
					alignItems: 'center',
					margin: 20,
				}}
			>
				<div>
					{outstanding()
						? `${outstanding()} невыполненна(ы)`
						: 'Все задачи выполнены!'}{' '}
				</div>
				<button style={{backgroundColor: '#ddd'}} onClick={() => isFilterCompletedTasks(false, true)}>Все</button>
				<button style={{backgroundColor: '#933456'}} onClick={() => isFilterCompletedTasks(false, false)}>
					Активные
				</button>
				<button style={{backgroundColor: 'green'}} onClick={() => isFilterCompletedTasks(true, false)}>
					Выполненные
				</button>
				<button style={{backgroundColor: 'red'}} onClick={deleteCompletedTasks}>Удалить выполненные</button>
			</div>
			<TodoItems items={currentItems} check={check} deleteItem={deleteItem}/>
		</div>
	)
}
