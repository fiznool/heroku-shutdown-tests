#!/bin/bash
#
# This script expects the following environment vars
# to be set:
#  - MEMORY_AVAILABLE: the total memory available to
#    the node process, in MB
#  - WEB_MEMORY: the amount of memory each
#    web process is expected to consume, in MB

node_args="startup.js --color"

if [[ -n "$WEB_MEMORY" ]]; then
  mem_node_old_space=$((($WEB_MEMORY*4)/5))

  echo "Dyno memory: "$MEMORY_AVAILABLE"MB"
  echo "Per-process memory: "$WEB_MEMORY"MB"
  echo "Cluster processes: "$WEB_CONCURRENCY
  echo "Node memory: "$mem_node_old_space"MB"
  echo ""

  node_args="--max_old_space_size=$mem_node_old_space $node_args"
  if [[ -n "$NODE_ARGS_TRACE_GC" ]]; then
    node_args="--trace_gc $node_args"
  fi

  if [[ -n "$NODE_ARGS_TRACE_GC_VERBOSE" ]]; then
    node_args="--trace_gc_verbose $node_args"
  fi
fi

echo "Starting app:"
echo "> node $node_args"
node $node_args
