import { type NextRequest, NextResponse } from "next/server"
import { createQueueItem, getServiceQueue } from "@/lib/queue-data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service } = body

    if (!service) {
      return NextResponse.json({ error: "Service is required" }, { status: 400 })
    }

    // Get current service info
    const serviceQueue = getServiceQueue(service)
    if (!serviceQueue) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 })
    }

    // Create walk-in queue item
    const currentDate = new Date()
    const queueItem = createQueueItem({
      service,
      date: currentDate.toISOString().split("T")[0],
      timeSlot: "walk-in",
      name: "Walk-in Customer",
      phone: "",
      purpose: "Walk-in service",
      status: "waiting",
    })

    return NextResponse.json({
      success: true,
      data: {
        queueNumber: queueItem.queueNumber,
        estimatedTime: queueItem.estimatedCallTime,
        currentQueue: serviceQueue.totalQueue,
        serviceName: serviceQueue.serviceName,
      },
    })
  } catch (error) {
    console.error("Error creating walk-in queue:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
