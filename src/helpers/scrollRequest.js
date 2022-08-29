const scrollRequest = section => {
	const emit = defineEmits(['scrollRequest']);
	emit('scrollRequest', section);
}

export default scrollRequest;