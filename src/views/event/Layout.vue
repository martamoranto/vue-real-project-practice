<template>
	<div v-if="event">
		<h1>{{ event.title }}</h1>
		<nav>
			<router-link :to="{ name: 'EventDetails' }">Details</router-link>
			|
			<router-link :to="{ name: 'EventRegister' }">Register</router-link>
			|
			<router-link :to="{ name: 'EventEdit' }">Edit</router-link>
		</nav>
		<router-view :event="event" />
	</div>
</template>
<script>
import EventService from '@/services/EventService.js'
export default {
	name: 'EventLayout',
	props: ['id'],
	data() {
		return {
			event: null,
		}
	},
	created() {
		// other way
		// EventService.getEvent(this.$route.params.id)
		EventService.getEvent(this.id)
			.then((response) => {
				this.event = response.data
			})
			.catch((error) => {
				if (error.response && error.response.status == 404) {
					this.$router.push({
						name: '404Resource',
						params: { resource: 'event' },
					})
				} else {
					this.$router.push({ name: 'NetworkError' })
				}
			})
	},
}
</script>
