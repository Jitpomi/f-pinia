<template>
  <Container
    id="ListsList"
    class="h-full flex overflow-x-auto gap-8  p-8"
    group-name="cols"
    tag="div"
    orientation="horizontal"
    @drop="onColumnDrop($event)">
    <Draggable class="bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-96 flex-shrink-0 shadow-xl"
               v-for="column in scene.children" :key="column.id">
      <q-card style="min-width: 250px; min-height: 300px" class="q-ma-sm">
        <div>{{ column.name }}</div>
        <Container
          class="flex-grow overflow-y-auto overflow-x-hidden"
          orientation="vertical"
          group-name="col-items"
          :shouldAcceptDrop="(e, payload) =>  (e.groupName === 'col-items' && !payload.loading)"
          :get-child-payload="getCardPayload(column.id)"
          :drop-placeholder="{ className:`q-mx-sm q-my-xs rounded-borders drop-placeholder-style`,animationDuration: '200', showOnTop: true }"

          drag-class="bg-primary dark:bg-primary text-white drag-style"
          drop-class="drop-style"
          @drop="(e) => onCardDrop(column.id, e)"
        >
          <draggable v-for="item in column.children" :key="item.id">
            <q-card class="q-ma-sm bg-primary text-white">
              <q-card-section>
                {{ item.data.name }}
              </q-card-section>
            </q-card>
          </draggable>
        </Container>

      </q-card>
    </Draggable>
  </Container>
</template>

<script setup>
  import {Container, Draggable} from 'vue3-smooth-dnd';
  import {computed, ref} from 'vue';

  const lists = ref([
    {
      _id: 0,
      name: 'A',
      order: 1,
      cards: [],
    }, {
      _id: 1,
      name: 'B',
      order: 2,
      cards: [
        {
          _id: 'a',
          name: 'card one',
          order: 1
        },
        {
          _id: 'b',
          name: 'card Two',
          order:2
        },
        {
          _id: 'c',
          name: 'card Three',
          order:3
        },
      ],
    }, {
      _id: 2,
      name: 'C',
      order: 3,
      cards: [],
    },

  ]);

  const scene = computed(() => {
    return {
      type: 'container',
      props: {
        orientation: 'horizontal',
      },
      children: lists.value.map(list => ({
        id: list._id,
        type: 'container',
        name: list.name,
        props: {
          orientation: 'vertical',
        },
        children: list.cards.map((card) => ({
          type: 'draggable',
          id: card._id,
          loading: false,
          data: card,
        })),
      })),
    };

  });

  function getCardPayload(columnId) {
    return index => {
      return scene.value.children.filter(p => p.id === columnId)[0].children[index];
    };
  }

  function onCardDrop(columnId, dropResult) {
    console.log({columnId,dropResult});
  }

  function onColumnDrop(dropResult) {
    console.log(dropResult);
  }

</script>

<style scoped>

  #ListsList:deep(.drop-placeholder-style) {
    background-color: rgba(var(--q-primary), 0.2);
    border: 2px dotted var(--q-primary);
  }

  #ListsList:deep(.drag-style) {
    border: 2px solid;
    z-index: 50;
    transform: rotate(6deg) scale(1.15) !important;
    transition: all 100ms ease-in !important;

    &:hover {
      border-color: var(--q-primary) !important;
    }
  }

  #ListsList:deep(.drop-style) {
    z-index: 50 !important;
    transform: rotate(-2deg) scale(0.9) !important;
    transition: all 100ms ease-in !important;
  }
</style>
