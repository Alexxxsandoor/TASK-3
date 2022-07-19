export function Info(props) {


	const {
		alpha_two_code,
		country,
		name,
		web_pages,
		index,
		saveUniver,
		setUniver = Function.prototype,
		handleCheked = Function.prototype
	} = props

	const findUniver = saveUniver.find(el => el === name)

	const delleteCheked = (name) => {
		setUniver(saveUniver.filter(el => el !== name))
	}

	return (
		<>
			<tr>
				<td>
					{index + 1}.
				</td>
				<td>
					"{alpha_two_code}"-{country}
				</td>
				<td>
					<a href={web_pages}>
						{name}
					</a>
				</td>
				<td>
					{findUniver === name ?
						(<input
							type="checkbox"
							onChange={() => delleteCheked(name)}
							checked
						/>)
						:
						(<input
							type="checkbox"
							onChange={() => handleCheked(name)}
						/>)
					}
					Save
				</td>
			</tr>
		</>
	)
}