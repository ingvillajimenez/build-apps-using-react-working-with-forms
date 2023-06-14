class HotelBookingForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			nameValue: "",
			emailValue: "",
			nameOfHotelValue: "Fantastic Hotels",
		};

		this.errors = {
			name: true,
			email: true
		};
	}

	validateName = (name) => {
		if (!name || name.length < 5) {
			this.errors.name = true;
			return false;
		}

		this.errors.name = false;
		return true;
	}

	validateEmail = (email) => {
		if (!/.+@.+\..+/.test(email)) {
			this.errors.email = true;
			return false;
		}
		this.errors.email = false;
		return true;
	}

	handleInputChange = (event) => {

		const name = event.target.name;
		var value = event.target.value;

		if (name == "nameValue") {
			value = value.toUpperCase();
		}

		this.setState({[name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (this.errors.email) {
			alert("Please enter a valid email address");
			return;
		} else if (this.errors.name) {
			alert("Please enter a name having a minimum of 5 characters");
			return;
		}

		alert("Are you sure you want to proceed with the booking? " +
			this.state.nameOfHotelValue);

		console.log("Name submitted: " + this.state.nameValue);
		console.log("Email Id submitted: " + this.state.emailValue);
		console.log("Name Of Hotel submitted: " + this.state.nameOfHotelValue);

		this.setState({
			nameValue: "",
			emailValue: "",
			nameOfHotelValue: "Fantastic Hotels"
		});
	}

	render() {
		return (
			<form className="contents" onSubmit={this.handleSubmit}>
				<TextInput label={"Name :"}
							name="nameValue"
							validate={this.validateName}
							value={this.state.nameValue}
							handleInputChange={this.handleInputChange} />
				<TextInput label={"Email Id :"}
							name="emailValue"
							validate={this.validateEmail}
							value={this.state.emailValue}
							handleInputChange={this.handleInputChange} />
				<SelectInput label={"Name Of Hotel :"}
								name="nameOfHotelValue"
								value={this.state.nameOfHotelValue}
								options={this.props.hotelNamesOptions}
								handleInputChange={this.handleInputChange} />

				<input className="button" type="submit" value="Submit" />
			</form>
		);
	}
}

HotelBookingForm.defaultProps = {
	hotelNamesOptions: [
		'Fantastic Hotels',
		'Wonderful Hotels',
		'Comfortable Hotels',
		'Pretentious Hotels'
	]
};

class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errorMessage: ''
		};
	}

	handleInputChange = (event) => {
		var errorMessage = "";

		if (!this.props.validate(event.target.value)) {
			errorMessage = "* Invalid";
		}
		this.props.handleInputChange(event);

		this.setState({errorMessage: errorMessage});
	}

	render() {
		return (
			<div>
				<div className="label">
					{this.props.label}
				</div>
				<input className="input" type="text"
						name={this.props.name}
						value={this.props.value}
						onChange={this.handleInputChange} />

				<ErrorMessage message={this.state.errorMessage} />
			</div>
		);
	}
}

class SelectInput extends React.Component {

	handleInputChange = (event) => {
		this.props.handleInputChange(event);
	}

	render() {
		return (
			<div>
				<div className="label">
					{this.props.label}
				</div>
				<select value={this.props.value}
						name={this.props.name}
						onChange={this.handleInputChange}>
					{
						this.props.options.map(
							(option) => <option key={option}
												value={option}>{option}</option>
						)
					}
				</select>
			</div>
		);
	}
}

class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<span className="error">
				{this.props.message}
			</span>
		);
	}
}

ReactDOM.render(<HotelBookingForm />, 
	document.getElementById("react-form-setup"));