// Task data
const taskData = {
    task1: {
        title: "Design System Setup",
        description: "Create component library and design tokens. This involves establishing consistent visual elements, typography, colors, and spacing guidelines that will be used throughout the application."
    },
    task2: {
        title: "API Integration", 
        description: "Connect frontend with backend services. Implement REST API endpoints, handle authentication, manage data flow, and ensure proper error handling throughout the application."
    },
    task3: {
        title: "UI Polish",
        description: "Final visual refinements and animations. Add micro-interactions, smooth transitions, loading states, and ensure the user interface feels responsive and delightful."
    },
    task4: {
        title: "Market Research Analysis",
        description: "Conduct comprehensive market research to understand target audience, competitive landscape, and market opportunities for the product launch."
    }
};

// DOM Elements
const projectSurface = document.querySelector('.project-surface');
const taskSurface = document.querySelector('.task-surface');
const activitySidebar = document.querySelector('.activity-sidebar');
const taskItems = document.querySelectorAll('.task-row');
const backButton = document.querySelector('.back-button');
const activityToggle = document.querySelector('.activity-toggle');
const closeActivity = document.querySelector('.close-activity');
const taskTitle = document.getElementById('task-title');
const taskTitleMain = document.getElementById('task-title-main');
const taskDescription = document.getElementById('task-description');
const currentAssignee = document.getElementById('current-assignee');
const assigneeDropdown = document.getElementById('assignee-dropdown');
const activityBanner = document.getElementById('activity-banner');
const bannerText = document.getElementById('banner-text');

// State management
let currentView = 'project'; // 'project' or 'task'
let activityOpen = true; // Open by default when in task view
let activityWidth = 300; // Default width in pixels
let dropdownOpen = false;

// AI Agents data
const aiAgents = {
    alex: {
        name: "Campaign Strategist AI",
        role: "Campaign Strategist AI",
        avatar: "CS",
        color: "#ff6b6b",
        description: "Expert in campaign planning, audience targeting, and marketing automation"
    },
    sarah: {
        name: "Creative Director AI", 
        role: "Creative Director AI",
        avatar: "CD",
        color: "#4ecdc4",
        description: "Specializes in visual design, brand identity, and creative content development"
    },
    mike: {
        name: "Data Insights AI",
        role: "Data Insights AI", 
        avatar: "DA",
        color: "#45b7d1",
        description: "Advanced analytics, performance tracking, and data-driven optimization"
    }
};

// Task selection handlers
taskItems.forEach(taskItem => {
    taskItem.addEventListener('click', () => {
        const taskId = taskItem.getAttribute('data-task');
        openTask(taskId);
    });
    
    // Add hover effects
    taskItem.addEventListener('mouseenter', () => {
        taskItem.style.transform = 'translateY(-2px)';
    });
    
    taskItem.addEventListener('mouseleave', () => {
        taskItem.style.transform = 'translateY(0)';
    });
});

// Back button handler
backButton.addEventListener('click', () => {
    closeTask();
});

// Activity toggle handlers
activityToggle.addEventListener('click', () => {
    toggleActivity();
});

closeActivity.addEventListener('click', () => {
    closeActivitySidebar();
});

// Assignee dropdown handlers
currentAssignee.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAssigneeDropdown();
});

assigneeDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    const option = e.target.closest('.assignee-option');
    if (option) {
        const agentId = option.getAttribute('data-agent');
        assignAgent(agentId);
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    if (dropdownOpen) {
        closeAssigneeDropdown();
    }
});

// Main functions
function openTask(taskId) {
    if (currentView === 'task') return;
    
    // Update task content
    const task = taskData[taskId];
    if (task) {
        taskTitleMain.textContent = task.title;
        if (taskTitle) taskTitle.textContent = task.title;
        if (taskDescription) taskDescription.textContent = task.description;
    }
    
    // Trigger sliding animation
    currentView = 'task';
    
    // Start both animations simultaneously for smooth coordinated movement
    projectSurface.classList.add('sliding-out');
    taskSurface.classList.add('active');
    
    // Show activity sidebar for task view
    activitySidebar.classList.add('task-view-active');
    activitySidebar.classList.add('active');
    activityOpen = true;
    
    // Update task surface width based on activity sidebar
    updateTaskSurfaceWidth();
    
    // Update activity toggle text based on current state
    updateActivityToggle();
}

function closeTask() {
    if (currentView === 'project') return;
    
    currentView = 'project';
    
    // Hide activity sidebar when returning to project view
    activitySidebar.classList.remove('task-view-active');
    activitySidebar.classList.remove('active');
    
    // Reset task surface width to full width
    taskSurface.classList.remove('activity-open');
    
    // Slide both surfaces back simultaneously
    taskSurface.classList.remove('active');
    projectSurface.classList.remove('sliding-out');
}

function toggleActivity() {
    if (activityOpen) {
        closeActivitySidebar();
    } else {
        openActivitySidebar();
    }
}

function openActivitySidebar() {
    activityOpen = true;
    activitySidebar.classList.add('active');
    updateTaskSurfaceWidth();
    updateActivityToggle();
}

function closeActivitySidebar() {
    activityOpen = false;
    activitySidebar.classList.remove('active');
    updateTaskSurfaceWidth();
    updateActivityToggle();
}

function updateTaskSurfaceWidth() {
    if (activityOpen && currentView === 'task') {
        document.documentElement.style.setProperty('--activity-width', `${activityWidth}px`);
        taskSurface.classList.add('activity-open');
    } else {
        taskSurface.classList.remove('activity-open');
    }
}

function updateActivityToggle() {
    const activityText = activityToggle.querySelector('span:last-child');
    if (activityOpen) {
        activityText.textContent = 'Close Activity';
        activityToggle.classList.add('active');
    } else {
        activityText.textContent = 'Activity';
        activityToggle.classList.remove('active');
    }
}

// Assignee dropdown functions
function toggleAssigneeDropdown() {
    if (dropdownOpen) {
        closeAssigneeDropdown();
    } else {
        openAssigneeDropdown();
    }
}

function openAssigneeDropdown() {
    dropdownOpen = true;
    currentAssignee.classList.add('open');
    assigneeDropdown.classList.add('open');
}

function closeAssigneeDropdown() {
    dropdownOpen = false;
    currentAssignee.classList.remove('open');
    assigneeDropdown.classList.remove('open');
}

function assignAgent(agentId) {
    const agent = aiAgents[agentId];
    if (!agent) return;
    
    // Update the current assignee display
    const avatarElement = currentAssignee.querySelector('.assignee-avatar-large');
    const nameElement = currentAssignee.querySelector('span:not(.dropdown-arrow)');
    
    avatarElement.textContent = agent.avatar;
    avatarElement.style.background = agent.color;
    nameElement.textContent = agent.name;
    
    // Show activity banner
    showActivityBanner(agent.name);
    
    // Close dropdown
    closeAssigneeDropdown();
    
    // Add activity to feed
    addAgentAssignmentActivity(agent);
}

function showActivityBanner(agentName) {
    bannerText.textContent = `${agentName} is working on task`;
    activityBanner.style.display = 'block';
    
    // Auto-hide after 8 seconds (longer to enjoy the animation)
    setTimeout(() => {
        activityBanner.style.display = 'none';
    }, 8000);
}

function addAgentAssignmentActivity(agent) {
    const activityContent = document.querySelector('.activity-content');
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-avatar" style="background: ${agent.color};">${agent.avatar}</div>
        <div class="activity-text">
            <strong>${agent.name}</strong> was assigned to this task
            <div class="activity-time">Just now</div>
        </div>
    `;
    
    // Add to top of activity feed
    activityContent.insertBefore(newActivity, activityContent.firstChild);
    
    // Animate in
    newActivity.style.opacity = '0';
    newActivity.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        newActivity.style.transition = 'all 0.3s ease';
        newActivity.style.opacity = '1';
        newActivity.style.transform = 'translateY(0)';
    }, 10);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (currentView === 'task' && activityOpen) {
            closeActivitySidebar();
        } else if (currentView === 'task') {
            closeTask();
        }
    }
    
    // Arrow key navigation for tasks
    if (currentView === 'project' && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        navigateTaskList(e.key === 'ArrowDown' ? 1 : -1);
    }
    
    // Enter to select task
    if (currentView === 'project' && e.key === 'Enter') {
        const focusedTask = document.querySelector('.task-row.focused');
        if (focusedTask) {
            focusedTask.click();
        }
    }
});

// Task list keyboard navigation
let focusedTaskIndex = 0;

function navigateTaskList(direction) {
    const tasks = Array.from(taskItems);
    
    // Remove current focus
    tasks[focusedTaskIndex].classList.remove('focused');
    
    // Update index
    focusedTaskIndex += direction;
    if (focusedTaskIndex < 0) focusedTaskIndex = tasks.length - 1;
    if (focusedTaskIndex >= tasks.length) focusedTaskIndex = 0;
    
    // Add new focus
    tasks[focusedTaskIndex].classList.add('focused');
    tasks[focusedTaskIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Add CSS for focused state
const style = document.createElement('style');
style.textContent = `
    .task-row.focused {
        background-color: #f0f8ff !important;
        outline: 1px solid #007AFF;
        outline-offset: -1px;
    }
`;
document.head.appendChild(style);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only process horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (currentView === 'task' && deltaX > 0) {
            // Swipe right - go back to project
            closeTask();
        }
    }
});

// Activity feed interaction
const activityInput = document.querySelector('.activity-input input');
const activityButton = document.querySelector('.activity-input button');

activityButton.addEventListener('click', () => {
    addComment();
});

activityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addComment();
    }
});

function addComment() {
    const comment = activityInput.value.trim();
    if (comment) {
        // Create new activity item
        const activityContent = document.querySelector('.activity-content');
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.innerHTML = `
            <div class="activity-avatar">CW</div>
            <div class="activity-text">
                <strong>Curtis</strong> ${comment}
                <div class="activity-time">Just now</div>
            </div>
        `;
        
        // Add to top of activity feed
        activityContent.insertBefore(newActivity, activityContent.firstChild);
        
        // Clear input
        activityInput.value = '';
        
        // Animate in
        newActivity.style.opacity = '0';
        newActivity.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            newActivity.style.transition = 'all 0.3s ease';
            newActivity.style.opacity = '1';
            newActivity.style.transform = 'translateY(0)';
        }, 10);
    }
}

// Activity sidebar resizing
const resizeHandle = document.querySelector('.resize-handle');
let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    e.preventDefault();
});

function handleResize(e) {
    if (!isResizing) return;
    
    const containerWidth = window.innerWidth;
    const newWidth = containerWidth - e.clientX;
    const minWidth = 250;
    const maxWidth = containerWidth * 0.5;
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
        activityWidth = newWidth;
        updateTaskSurfaceWidth();
        activitySidebar.style.width = `${newWidth}px`;
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
}

// Initialize
if (taskItems.length > 0) {
    taskItems[0].classList.add('focused');
}
// Activity sidebar starts hidden on project view

// Debug logging
console.log('Sliding Surface prototype loaded');
console.log('Available interactions:');
console.log('- Click any task to open task view');
console.log('- Use back button or ESC key to return to project view');
console.log('- Click Activity button to open/close activity sidebar');
console.log('- Drag the left edge of activity sidebar to resize');
console.log('- Use arrow keys to navigate tasks, Enter to select');
console.log('- Swipe right on mobile to go back');
