const animate = (el, settings, viewed) => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				viewed.value = true;
				observer.unobserve(entry.target);
			}
		});
	}, settings);

	observer.observe(el.value);
}

export default animate;