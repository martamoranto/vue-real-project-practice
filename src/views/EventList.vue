<template>
	<h1>Events For Good</h1>
	<div class="events">
		<EventCard
			v-for="event in events"
			:key="event.id"
			:event="event"
		/>
		<div class="pagination">
			<router-link
				id="prev"
				:to="{ name: 'EventList', query: { page: page - 1 } }"
				rel="prev"
				v-if="page != 1"
			>
				Prev Page
			</router-link>
			<router-link
				v-for="(page, index) in getPages"
				:key="index"
				id="page-num"
				:to="{ name: 'EventList', query: { page: index + 1 } }"
				rel="prev"
			>
				{{ index + 1 }}
			</router-link>
			<router-link
				id="next"
				:to="{ name: 'EventList', query: { page: page + 1 } }"
				rel="next"
				v-if="hasNextPage"
			>
				Next Page
			</router-link>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'
export default {
	name: 'EventList',
	props: ['page'],
	data() {
		return {
			events: null,
			totalEvents: 0,
		}
	},
	components: {
		EventCard,
	},
	created() {
		watchEffect(() => {
			this.events = null
			EventService.getEvents(2, this.page)
				.then((response) => {
					this.events = response.data
					this.totalEvents = response.headers['x-total-count']
				})
				.catch(() => {
					this.$router.push({ name: 'NetworkError' })
				})
		})
	},

	computed: {
		hasNextPage() {
			var totalPages = Math.ceil(this.totalEvents / 2)
			return this.page < totalPages
		},

		getPages() {
			return Math.ceil(this.totalEvents / 2)
		},
	},
}
</script>

<style scoped>
.events {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.pagination {
	display: flex;
	width: 290px;
}

.pagination a {
	flex: 1;
	text-decoration: none;
	color: #2c3e50;
}

#page-num {
	flex: 0;
	padding: 0 8px;
}

#prev {
	text-align: left;
}

#next {
	text-align: right;
}
</style>
