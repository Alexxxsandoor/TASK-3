import { useEffect, useState } from "react";
import { Info } from "./Info";


function App() {

	const [search, setSearch] = useState(JSON.parse(localStorage.getItem('storedUsersSearch')))//строка поиска
	const [saveUniver, setUniver] = useState(JSON.parse(localStorage.getItem('storedUsersUniver')))//список отмеченных
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(false)



	const handleClear = () => {
		setSearch('')
	}

	useEffect(() => {
		localStorage.setItem('storedUsersSearch', JSON.stringify(search));
		localStorage.setItem('storedUsersUniver', JSON.stringify(saveUniver));
		fetch(`http://universities.hipolabs.com/search?name=middle&country=${search}`)
			.then((response) => {
				setLoading(false)
				return response.json();
			})
			.then((data) => {
				setList(data)
				setLoading(true)
			});
	}, [search, saveUniver])

	return (
		<>
			<h1><a href="https://github.com/Alexxxsandoor/TASK-3">git repository</a></h1>
			<form>
				<input
					type="text"
					value={search}
					placeholder="search"
					onChange={(event) => setSearch(event.target.value)}
				/>
				<button onClick={handleClear}>clear</button>
				Save: {saveUniver.length}
			</form>
			{!loading ?
				<p>Loading...</p>
				:
				<div className="info">
					{!list.length ?
						<h1>Ничего нет</h1>
						:
						(<table>
							<tr>
								<th>№</th>
								<th>Name</th>
								<th>Link</th>
								<th><button onClick={() => setUniver([])}>Delete all checked</button></th>
							</tr>
							{list.map((el, index) =>
								<Info
									saveUniver={saveUniver}

									setUniver={setUniver}
									index={index}
									key={el.name}
									{...el}
								/>
							)}
						</table>
						)
					}
				</div>
			}
		</>
	);
}

export default App;
